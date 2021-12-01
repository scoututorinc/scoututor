import {
  BlitzPage,
  GetServerSideProps,
  invokeWithMiddleware,
  InferGetServerSidePropsType
} from 'blitz'
import { Flex, Heading, Divider, VStack, Button } from '@chakra-ui/react'

import { PromiseReturnType } from 'next/dist/types/utils'

import LoggedInLayout from 'app/core/layouts/LoggedInLayout'
import CourseReview from 'app/courses/components/CourseReview'
import CourseDescription from 'app/courses/components/CourseDescription'
import CourseTeacher from 'app/courses/components/CourseTeacher'

import getCourse from 'app/courses/queries/getCourse'

const CourseView: BlitzPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  course,
  error
}) => {
  const is_enrolled = false
  const is_teacher = true

  return course ? (
    <Flex direction='column' w='100%' h='100%' overflowY='scroll' overflowX='hidden' p={10}>
      <VStack spacing={2} pb={8} alignItems='start'>
        <Heading>{course.title}</Heading>
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
        <CourseDescription {...course} />
      </Flex>
    </Flex>
  ) : (
    <p>{JSON.stringify(error)}</p>
  )
}

const paramToInt = (param: string | string[] | undefined) => {
  if (typeof param == 'string') return parseInt(param)
  else return -1
}

export const getServerSideProps: GetServerSideProps<{
  course?: PromiseReturnType<typeof getCourse>
  error?: any
}> = async (context) => {
  try {
    const course = await invokeWithMiddleware(getCourse, paramToInt(context?.params?.id), context)
    return {
      props: { course }
    }
  } catch (e) {
    console.log(e)
    return {
      props: { error: e }
    }
  }
}

CourseView.suppressFirstRenderFlicker = true
CourseView.getLayout = (page) => <LoggedInLayout title='Course'>{page}</LoggedInLayout>
export default CourseView
