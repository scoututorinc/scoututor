import { useMutation } from 'blitz'
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
import { CourseCreation } from 'app/courses/validations'
import { RiErrorWarningFill } from 'react-icons/ri'
import course_creation from 'app/courses/mutations/course_creation'

type CourseCreationFormProps = {
  onSuccess?: () => void
}

export const CourseCreationForm = (props: CourseCreationFormProps) => {
  const [courseCreationMutation] = useMutation(course_creation)

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
          <Img src='images/knowledge.png' maxWidth='100px'></Img>
          <Heading>Create Course</Heading>
        </Stack>
        <Form
          schema={CourseCreation}
          initialValues={{ name: '', description: '', hourlyRate: 0 }}
          onSubmit={async (values) => {
            try {
              console.log(values)
              console.log('Tried to create course')
              // await courseCreationMutation(values)
            } catch (error: any) {
              console.log(error)
            }
          }}
        >
          <VStack spacing={6} p={4} mb={2}>
            <LabeledTextField
              label='Course subject'
              name='name'
              placeholder='Search the subject your course fits into'
            />
            <HStack spacing={4} mb={2}>
              <Icon w={8} h={8} as={RiErrorWarningFill}></Icon>
              <Text fontSize='md'>
                If you don`t find the subject you`re looking for, please suggest it.
              </Text>
            </HStack>
            <LabeledTextAreaField
              label='Detailed description'
              name='description'
            ></LabeledTextAreaField>
            <LabeledTextField
              type='number'
              label='Hourly rate'
              name='hourlyRate'
              placeholder='Enter the hourly price your students must endure'
            />
            <Stack
              direction={{ base: 'column', md: 'row' }}
              justifyContent='center'
              alignItems='center'
              spacing={2}
              w='100%'
            >
              <Button variant='outline' w='50%'>
                Return to courses page
              </Button>
              <Button type='submit' colorScheme='teal' w='50%'>
                Create course
              </Button>
            </Stack>
          </VStack>
        </Form>
      </Flex>
    </Box>
    // 253914421
    // 253911140
  )
}
