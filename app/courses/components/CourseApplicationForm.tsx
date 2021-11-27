import { useMutation } from 'blitz'
import {
  Box,
  Flex,
  HStack,
  VStack,
  Stack,
  Img,
  Heading,
  Text,
  Center,
  Button,
  Icon
} from '@chakra-ui/react'

import Form from 'app/core/components/forms/Form'
import course_application from 'app/courses/mutations/createCourseApplication'
import { LabeledTextAreaField } from 'app/core/components/forms/LabeledTextAreaField'

import { CourseApplication } from 'app/courses/validations'

import { RiErrorWarningFill } from 'react-icons/ri'

type CourseApplicationFormProps = {
  onSucess?: () => void
}

export const CourseApplicationForm = (props: CourseApplicationFormProps) => {
  const [courseApplicationMutation] = useMutation(course_application)

  return (
    <Box borderWidth='2px' borderColor='teal.400' rounded={6} width={{ base: '100%', lg: '70%' }}>
      <Flex alignItems='center' justifyContent='center' direction='column' width='100%'>
        <Stack
          direction={{ base: 'column', md: 'row' }}
          spacing={6}
          padding={10}
          justifyContent='center'
          alignItems='center'
        >
          <Img src='images/knowledge.png' maxWidth='100px'></Img>
          <Heading>Application</Heading>
        </Stack>
        <Form
          schema={CourseApplication}
          initialValues={{ description: '', availableSchedule: '' }}
          onSubmit={async (values) => {
            try {
              console.log(values)
              console.log('Tried to submit')
              // await courseApplicationMutation(values)
              props.onSucess?.()
            } catch (error: any) {
              console.log(error)
            }
          }}
        >
          <VStack spacing={6} p={4} mb={2}>
            <LabeledTextAreaField
              name='interest_manifestation_and_questions'
              label='Interest manifestation and questions'
              size='sm'
              type='text'
            ></LabeledTextAreaField>
            <LabeledTextAreaField
              name='availability'
              label='Availability'
              size='sm'
              type='text'
            ></LabeledTextAreaField>
          </VStack>
          <HStack p={4} mb={2}>
            <Icon w={8} h={8} as={RiErrorWarningFill}></Icon>
            <Text fontSize='md'>
              You will be informed as soon as the author verifies his availablity.
            </Text>
          </HStack>
          <Center>
            <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
              <Button variant='outline'>Return to course page</Button>
              <Button colorScheme='teal' type='submit'>
                Submit application
              </Button>
            </Stack>
          </Center>
        </Form>
      </Flex>
    </Box>
  )
}
