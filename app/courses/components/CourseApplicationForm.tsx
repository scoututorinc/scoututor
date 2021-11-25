import { useMutation } from 'blitz'
import {
  Box,
  Flex,
  HStack,
  VStack,
  Img,
  Heading,
  Text,
  Center,
  Button,
  Icon
} from '@chakra-ui/react'

import Form from 'app/core/components/forms/Form'
import course_application from 'app/courses/mutations/course_application'
import { TextAreaField } from 'app/core/components/forms/TextAreaField'

import { CourseApplication } from 'app/courses/validations'

import { RiErrorWarningFill } from 'react-icons/ri'

type CourseApplicationFormProps = {
  onSucess?: () => void
}

export const CourseApplicationForm = (props: CourseApplicationFormProps) => {
  const [courseApplicationMutation] = useMutation(course_application)

  return (
    <Box borderWidth='2px' borderColor='teal.400' rounded={6} width='70%'>
      <Flex alignItems='center' justifyContent='center' direction='column' width='100%'>
        <HStack spacing={6} padding={10} justifyContent='center'>
          <Img src='images/knowledge.png' maxWidth='100px'></Img>
          <Heading>Application</Heading>
        </HStack>
        <Form
          schema={CourseApplication}
          initialValues={{ interest_manifestation_and_questions: '', availability: '' }}
          onSubmit={async (values) => {
            try {
              console.log('Tried to submit')
              // await courseApplicationMutation(values)
              props.onSucess?.()
            } catch (error: any) {
              console.log(error)
            }
          }}
        >
          <VStack spacing={6} p={4} mb={2}>
            <TextAreaField
              name='interest_manifestation_and_questions'
              label='Interest manifestation and questions'
              size='sm'
              type='text'
            ></TextAreaField>
            <TextAreaField
              name='availability'
              label='Availability'
              size='sm'
              type='text'
            ></TextAreaField>
          </VStack>
          <HStack p={4} mb={2}>
            <Icon w={8} h={8} as={RiErrorWarningFill}></Icon>
            <Text fontSize='md'>
              You will be informed as soon as the author verifies his availablity.
            </Text>
          </HStack>
          <Center>
            <HStack spacing={4}>
              <Button variant='outline'>Return to course page</Button>
              <Button colorScheme='teal' type='submit'>
                Submit application
              </Button>
            </HStack>
          </Center>
        </Form>
      </Flex>
    </Box>
  )
}
