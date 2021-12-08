import { useState } from 'react'
import { AuthenticationError, useMutation, useQuery, validateZodSchema } from 'blitz'
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
  Button,
  Grid
} from '@chakra-ui/react'
import { RiErrorWarningFill } from 'react-icons/ri'

import { Form as FinalForm } from 'react-final-form'
import { FORM_ERROR } from 'final-form'
import { z } from 'zod'

import { LabeledTextField } from 'app/core/components/forms/LabeledTextField'
import { LabeledTextAreaField } from 'app/core/components/forms/LabeledTextAreaField'
import { SelectField } from 'app/core/components/forms/SelectField'
import {
  LabeledCheckboxArray,
  CheckboxArrayControl
} from 'app/core/components/forms/LabeledCheckboxArray'

import { CreateCourseInput } from 'app/courses/validations'
import getKnowledgeAreas from 'app/courses/queries/getKnowledgeAreas'

type CourseCreationFormProps = {
  submit: (input: z.infer<typeof CreateCourseInput>) => Promise<any>
  onSuccess?: (id: number) => void
  defaultValues?: z.infer<typeof CreateCourseInput>
  disciplines?: string[]
}

const KnowledgeAreasField = ({ discipline }: { discipline?: string }) => {
  const [knowledgeAreas] = useQuery(getKnowledgeAreas, discipline, {
    enabled: !!discipline,
    suspense: false
  })
  return (
    <LabeledCheckboxArray name='knowledgeAreas' label='Knowledge Areas' my={4}>
      <Grid templateColumns='repeat(3, 1fr)' gap={6}>
        {knowledgeAreas?.map((k) => (
          <CheckboxArrayControl
            name='knowledgeAreas'
            key={discipline + k.name}
            label={k.name}
            value={k.name}
          />
        ))}
      </Grid>
    </LabeledCheckboxArray>
  )
}

export const CourseCreationForm = ({
  defaultValues,
  disciplines,
  submit,
  onSuccess
}: CourseCreationFormProps) => {
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
          <Img src='/images/add_course.png' maxWidth='100px'></Img>
          <Heading>{defaultValues ? 'Update Course' : 'Create course'}</Heading>
        </Stack>
        <FinalForm
          validate={validateZodSchema(CreateCourseInput)}
          initialValues={
            defaultValues || {
              title: '',
              description: '',
              hourlyRate: 0,
              previewImage:
                'https://cdn.britannica.com/q:60/91/181391-050-1DA18304/cat-toes-paw-number-paws-tiger-tabby.jpg'
            }
          }
          onSubmit={async (values) => {
            try {
              console.log(values)
              console.log('Tried to create course')
              const course = await submit(values)
              onSuccess?.(course.id)
            } catch (error: any) {
              if (error instanceof AuthenticationError) {
                return { [FORM_ERROR]: 'Sorry, those credentials are invalid' }
              } else {
                return {
                  [FORM_ERROR]:
                    'Sorry, we had an unexpected error. Please try again. - ' + error.toString()
                }
              }
            }
          }}
          debug={(e) => console.log(e.validating, JSON.stringify(e.errors))}
          render={({ form, handleSubmit, submitting, submitError, values }) => (
            <Box as='form' p={4} onSubmit={handleSubmit}>
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
                <LabeledCheckboxArray name='methods' label='Method' my={4}>
                  <Grid templateColumns='repeat(2, 1fr)' gap={6}>
                    <CheckboxArrayControl name='methods' label='Online' value='ONLINE' />
                    <CheckboxArrayControl name='methods' label='Presential' value='PRESENTIAL' />
                  </Grid>
                </LabeledCheckboxArray>
                <LabeledCheckboxArray name='knowledgeLevels' label='Knowledge Level' my={4}>
                  <Grid templateColumns='repeat(3, 1fr)' gap={6}>
                    <CheckboxArrayControl
                      name='knowledgeLevels'
                      label='BEGINNER'
                      value='BEGINNER'
                    />
                    <CheckboxArrayControl
                      name='knowledgeLevels'
                      label='INTERMEDIATE'
                      value='INTERMEDIATE'
                    />
                    <CheckboxArrayControl
                      name='knowledgeLevels'
                      label='ADVANCED'
                      value='ADVANCED'
                    />
                    <CheckboxArrayControl
                      name='knowledgeLevels'
                      label='FIRSTCYCLE'
                      value='FIRSTCYCLE'
                    />
                    <CheckboxArrayControl
                      name='knowledgeLevels'
                      label='SECONDCYCLE'
                      value='SECONDCYCLE'
                    />
                    <CheckboxArrayControl
                      name='knowledgeLevels'
                      label='THIRDCYCLE'
                      value='THIRDCYCLE'
                    />
                    <CheckboxArrayControl
                      name='knowledgeLevels'
                      label='SECONDARY'
                      value='SECONDARY'
                    />
                    <CheckboxArrayControl
                      name='knowledgeLevels'
                      label='BACHELOR'
                      value='BACHELOR'
                    />
                    <CheckboxArrayControl name='knowledgeLevels' label='MASTER' value='MASTER' />
                  </Grid>
                </LabeledCheckboxArray>
                {disciplines ? (
                  <SelectField
                    name='discipline'
                    label='Discipline'
                    placeholder='Select one'
                    onChange={(e: any) => {
                      form.change('knowledgeAreas', [])
                    }}
                  >
                    {disciplines.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </SelectField>
                ) : (
                  <SelectField
                    name='discipline'
                    label='Discipline'
                    disabled
                    placeholder={defaultValues?.discipline}
                  />
                )}
                {values.discipline && <KnowledgeAreasField discipline={values.discipline} />}
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
                  <Button type='submit' disabled={submitting} colorScheme='teal' w='50%'>
                    {defaultValues ? 'Update Course' : 'Create course'}
                  </Button>
                </Stack>
              </VStack>

              {submitError && (
                <div role='alert' style={{ color: 'red' }}>
                  {submitError}
                </div>
              )}
              {JSON.stringify({
                discipline: values.discipline,
                k: values.knowledgeAreas
              })}
            </Box>
          )}
        />
      </Flex>
    </Box>
  )
}
