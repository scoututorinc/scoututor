import { BlitzPage, useQuery, useParam } from 'blitz'
import { Flex, Heading, Divider, VStack, Button, Box } from '@chakra-ui/react'

import LoggedInLayout from 'app/core/layouts/LoggedInLayout'
import CourseReview from 'app/courses/components/CourseReview'
import CourseDescription from 'app/courses/components/CourseDescription'
import CourseTeacher from 'app/courses/components/CourseTeacher'
import getCourse from 'app/courses/queries/getCourse'

const paramToInt = (param: string | string[] | undefined) => {
  if (typeof param == 'string') return parseInt(param)
  else return -1
}

const CourseView: BlitzPage = () => {
  const courseId = useParam('id')
  const [course, status] = useQuery(getCourse, paramToInt(courseId), {
    suspense: false
  })
  const is_enrolled = false
  const is_teacher = true

  return status.isError == false && course ? (
    <Flex direction='column' w='100%' h='100%' overflowY='scroll' overflowX='hidden' p={10}>
      <VStack spacing={2} pb={8} alignItems='start'>
        <Heading>{course.name}</Heading>
        <Divider />
      </VStack>
      <Flex direction={{ base: 'column', md: 'row' }} justifyContent='space-between'>
        <Flex
          direction='column'
          justifyContent='center'
          alignItems='center'
          maxWidth={{ base: '100%', lg: '25%' }}
        >
          <CourseTeacher {...course.author} />
          <CourseReview />
          <CourseReview />
          {is_enrolled && (
            <VStack spacing={4} width='90%'>
              <Button colorScheme='teal' width='80%'>
                Comment on course
              </Button>
              <Button colorScheme='red' width='80%'>
                Cancel subscription
              </Button>
            </VStack>
          )}
        </Flex>
        <CourseDescription description={course.description} hourlyRate={course.hourlyRate} />
      </Flex>
    </Flex>
  ) : (
    <p>Error :^(</p>
  )
}

CourseView.suppressFirstRenderFlicker = true
CourseView.getLayout = (page) => <LoggedInLayout title='Course'>{page}</LoggedInLayout>
export default CourseView
