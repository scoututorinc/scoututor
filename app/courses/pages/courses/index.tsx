import {
  BlitzPage,
  GetServerSideProps,
  invokeWithMiddleware,
  InferGetServerSidePropsType,
  Routes
} from 'blitz'
import { Heading, Flex, Grid, Button, Box } from '@chakra-ui/react'

import { PromiseReturnType } from 'next/dist/types/utils'

import LoggedInLayout from 'app/core/layouts/LoggedInLayout'
import getCourses from 'app/courses/queries/getCourses'
import CourseShortDisplay from 'app/courses/components/CourseShortDisplay'

import { StyledLink } from 'app/core/components/StyledLink'

const CoursesView: BlitzPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  courses,
  error
}) => {
  return courses ? (
    <Flex direction='column' w='100%' h='100%' overflowY='scroll' overflowX='hidden' p={10}>
      <Heading pb={6}>Courses</Heading>
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
