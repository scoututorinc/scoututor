import { useState } from 'react'
import { useMutation, useQuery } from 'blitz'
import {
  Flex,
  Box,
  HStack,
  VStack,
  Stack,
  Img,
  Heading,
  Icon,
  Text,
  Button
} from '@chakra-ui/react'
import Form from 'app/core/components/forms/Form'
import { LabeledTextField } from 'app/core/components/forms/LabeledTextField'
import { LabeledTextAreaField } from 'app/core/components/forms/LabeledTextAreaField'
import { CreateCourseInput } from 'app/courses/validations'
import { RiErrorWarningFill } from 'react-icons/ri'
import createCourse from 'app/courses/mutations/createCourse'

import { SelectField } from 'app/core/components/forms/SelectField'
import {
  LabeledCheckboxArray,
  CheckboxArrayControl
} from 'app/core/components/forms/LabeledCheckboxArray'
import getKnowledgeAreas from 'app/courses/queries/getKnowledgeAreas'

type CourseCreationFormProps = {
  onSuccess?: () => void
  disciplines: string[]
}

export const CourseCreationForm = ({ disciplines, onSuccess }: CourseCreationFormProps) => {
  const [createCourseMutation] = useMutation(createCourse)

  const [discipline, setDiscipline] = useState<string | null>(null)
  const [knowledgeAreas] = useQuery(getKnowledgeAreas, discipline, {
    enabled: !!discipline,
    suspense: false
  })

  return (
    <Box borderWidth='2px' borderColor='teal.400' rounded={6} w={{ base: '90%', lg: '70%' }}>
      <Flex alignItems='center' justifyContent='center' direction='column' w='100%'>
        <Stack
          direction={{ base: 'column', lg: 'row' }}
          spacing={6}
          p={10}
          justifyContent='center'
          alignItems='center'
        >
          <Img src='/images/knowledge.png' maxWidth='100px'></Img>
          <Heading>Create Course</Heading>
        </Stack>
        <Form
          schema={CreateCourseInput}
          initialValues={{ title: '', description: '', hourlyRate: 0 }}
          onSubmit={async (values) => {
            try {
              console.log(values)
              console.log('Tried to create course')
              await createCourseMutation(values)
            } catch (error: any) {
              console.log(error)
            }
          }}
        >
          <VStack spacing={6} p={4} mb={2}>
            <LabeledTextField
              label='Course title'
              name='title'
              placeholder='Give your course a title'
            />
            <HStack spacing={4} mb={2}>
              <Icon w={8} h={8} as={RiErrorWarningFill}></Icon>
              <Text fontSize='md'>
                {"If you don't find the subject you're looking for, please suggest it"}
              </Text>
            </HStack>
            <LabeledTextAreaField
              label='Detailed description'
              placeholder='Tell your students about your course'
              name='description'
            />
            <LabeledTextField
              type='number'
              label='Hourly rate'
              name='hourlyRate'
              placeholder='Enter the hourly price your students must endure'
            />
            <SelectField
              name='discipline'
              label='Discipline'
              placeholder='Select one'
              onChange={(e) => setDiscipline(e.target.value)}
            >
              {disciplines.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </SelectField>
            {/* TODO: When discipline changes, the array gets updated by form values don't, should clear when discipline changes */}
            {discipline && (knowledgeAreas?.length || 0) > 0 && (
              <LabeledCheckboxArray name='knowledgeAreas' label='Knowledge Areas' my={4}>
                <Stack pl={6} mt={1} spacing={1}>
                  {knowledgeAreas?.map((k) => (
                    <CheckboxArrayControl
                      name='knowledgeAreas'
                      key={discipline + k.name}
                      label={k.name}
                      value={k.name}
                    />
                  ))}
                </Stack>
              </LabeledCheckboxArray>
            )}
            <Stack
              direction={{ base: 'column', md: 'row' }}
              justifyContent='center'
              alignItems='center'
              spacing={2}
              w='100%'
            >
              <Button variant='outline' w='50%'>
                Cancel
              </Button>
              <Button type='submit' colorScheme='teal' w='50%'>
                Create course
              </Button>
            </Stack>
          </VStack>
        </Form>
        {JSON.stringify({ discipline, k: knowledgeAreas?.map((k) => k.name) })}
        {JSON.stringify('ola')}
      </Flex>
    </Box>
  )
}
