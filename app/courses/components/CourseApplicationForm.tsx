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
  Icon,
  Grid
} from '@chakra-ui/react'

import Form from 'app/core/components/forms/Form'
import course_application from 'app/courses/mutations/createCourseApplication'
import { LabeledTextAreaField } from 'app/core/components/forms/LabeledTextAreaField'

import { CourseApplication } from 'app/courses/validations'

import { RiErrorWarningFill } from 'react-icons/ri'
import {
  CheckboxArrayControl,
  LabeledCheckboxArray
} from 'app/core/components/forms/LabeledCheckboxArray'
import { dateToHourMinString } from 'utils'

type CourseApplicationFormProps = {
  onSuccess?: (id: number) => void
  courseId: number
  availableSessions: { id: number; day: string; startTime: Date; endTime: Date; userId: number }[]
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
          <Img src='/images/application.png' maxWidth='100px' />
          <Heading>Application</Heading>
        </Stack>
        <Form
          schema={CourseApplication}
          keepDirtyOnReinitialize={true}
          initialValues={{ description: '', availableSessions: [], courseId: props.courseId }}
          onSubmit={async (values) => {
            try {
              console.log(values)
              console.log('Tried to submit')
              const newApplication = await courseApplicationMutation(values)
              props.onSuccess?.(newApplication.id)
            } catch (error: any) {
              console.log(error)
            }
          }}
        >
          <LabeledTextAreaField
            name='description'
            label='Interest manifestation and questions'
            placeholder='What do you expect from this course ?'
            size='sm'
            type='text'
          />
          {/* <LabeledTextAreaField
            name='availableSchedule'
            label='Availability'
            placeholder='When are you available for classes ?'
            size='sm'
            type='text'
          /> */}
          <LabeledCheckboxArray name='availableSessions' label='Available sessions' my={4}>
            <Grid templateColumns='repeat(3, 1fr)' gap={6}>
              {props.availableSessions?.map((s) => (
                <CheckboxArrayControl
                  key={s.id}
                  name='availableSessions'
                  label={`${s.day} ${dateToHourMinString(s.startTime)}-${dateToHourMinString(
                    s.endTime
                  )}`}
                  value={s.id}
                />
              ))}
            </Grid>
          </LabeledCheckboxArray>
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
