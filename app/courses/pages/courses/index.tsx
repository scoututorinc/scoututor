import {
  BlitzPage,
  GetServerSideProps,
  invokeWithMiddleware,
  InferGetServerSidePropsType
} from 'blitz'
import { Heading, Flex, Stack } from '@chakra-ui/react'

import { PromiseReturnType } from 'next/dist/types/utils'

import LoggedInLayout from 'app/core/layouts/LoggedInLayout'
import getCourses from 'app/courses/queries/getCourses'
import { StyledLink } from 'app/core/components/StyledLink'
import CourseShortDisplay from 'app/courses/components/CourseShortDisplay'

const CoursesView: BlitzPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  courses,
  error
}) => {
  return courses ? (
    <Flex direction='column' w='100%' h='100%' overflowY='scroll' overflowX='hidden' p={10}>
      <Heading pb={6}>Courses</Heading>
      <Stack direction='column' spacing={4}>
        {courses.map((c) => (
          <CourseShortDisplay key={c.id} {...c} />
        ))}
      </Stack>
    </Flex>
  ) : (
    <p>{JSON.stringify(error)}</p>
  )
}

export const getServerSideProps: GetServerSideProps<{
  courses?: PromiseReturnType<typeof getCourses>
  error?: any
}> = async (context) => {
  try {
    const courses = await invokeWithMiddleware(getCourses, null, context)
    return {
      props: { courses }
    }
  } catch (e) {
    console.log(e)
    return {
      props: { error: e }
    }
  }
}

CoursesView.suppressFirstRenderFlicker = true
CoursesView.getLayout = (page) => <LoggedInLayout title='Courses'>{page}</LoggedInLayout>
export default CoursesView
