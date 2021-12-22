import {
  BlitzPage,
  GetServerSideProps,
  invokeWithMiddleware,
  InferGetServerSidePropsType,
  Routes
} from 'blitz'
import { Heading, Flex, Grid, Button, Box, Divider, HStack, VStack, Spacer } from '@chakra-ui/react'

import { PromiseReturnType } from 'next/dist/types/utils'

import LoggedInLayout from 'app/core/layouts/LoggedInLayout'
import getCourses from 'app/courses/queries/getCourses'
import getUserEnrolledCourses from 'app/users/queries/getUserMainPageData'
import CourseShortDisplay from 'app/courses/components/CourseShortDisplay'

import { StyledLink } from 'app/core/components/StyledLink'

const CoursesView: BlitzPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  courses,
  userEnrolledCourses,
  error
}) => {
  const userTagsNested = userEnrolledCourses?.map((c) => c.knowledgeAreas.map((ka) => ka.name))
  const userTags = Array.prototype.concat.apply([], userTagsNested)

  let suggestionCourses = courses?.filter((c) =>
    c.knowledgeAreas.some((e) => userTags.includes(e.name))
  )
  suggestionCourses = suggestionCourses?.splice(
    Math.floor(Math.random() * suggestionCourses.length),
    4
  )

  return courses ? (
    <Flex direction='column' w='100%' h='100%' overflowY='scroll' overflowX='hidden' p={10}>
      <VStack mb={4}>
        <Heading size='lg'>Suggested Courses</Heading>
        <Divider mt={4} />
      </VStack>
      <Spacer />
      <Grid
        templateColumns={{
          base: 'repeat(2, 1fr)',
          lg: 'repeat(3, 1fr)',
          xl: 'repeat(4, 1fr)'
        }}
        gap={4}
      >
        {suggestionCourses?.map((c) => (
          <CourseShortDisplay key={c.id} {...c} />
        ))}
      </Grid>
      <VStack mb={4}>
        <Heading pb={6}>Courses</Heading>
        <Divider mt={4} />
      </VStack>
      <Spacer />
      <Grid
        templateColumns={{
          base: 'repeat(1, 1fr)',
          lg: 'repeat(2, 1fr)',
          xl: 'repeat(3, 1fr)'
        }}
        gap={4}
      >
        <Box display='grid' placeItems='center' rounded={6} borderWidth='2px'>
          <StyledLink href={Routes.CreateCourse()}>
            <Button marginX='auto' marginY='auto' display='block' colorScheme='teal'>
              New
            </Button>
          </StyledLink>
        </Box>
        {courses.map((c) => (
          <CourseShortDisplay key={c.id} {...c} />
        ))}
      </Grid>
    </Flex>
  ) : (
    <p>{JSON.stringify(error)}</p>
  )
}

export const getServerSideProps: GetServerSideProps<{
  courses?: PromiseReturnType<typeof getCourses>
  userEnrolledCourses?: PromiseReturnType<typeof getUserEnrolledCourses>
  error?: any
}> = async (context) => {
  try {
    const courses = await invokeWithMiddleware(getCourses, null, context)
    const userEnrolledCourses = await invokeWithMiddleware(getUserEnrolledCourses, null, context)
    return {
      props: { courses, userEnrolledCourses }
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
