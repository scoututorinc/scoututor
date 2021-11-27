import {
  BlitzPage,
  Routes,
  GetServerSideProps,
  invokeWithMiddleware,
  InferGetServerSidePropsType
} from 'blitz'
import { Heading, UnorderedList, ListItem, Flex } from '@chakra-ui/react'

import LoggedInLayout from 'app/core/layouts/LoggedInLayout'
import getCourses from 'app/courses/queries/getCourses'
import { StyledLink } from 'app/core/components/StyledLink'

const CoursesView: BlitzPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  courses
}) => {
  return courses ? (
    <Flex direction='column' w='100%' h='100%' overflowY='scroll' overflowX='hidden' p={10}>
      <Heading>Courses</Heading>
      <UnorderedList>
        {courses.map((c) => (
          <ListItem key={c.id}>
            <StyledLink href={Routes.CourseView({ id: c.id })}>{c.name}</StyledLink>
          </ListItem>
        ))}
      </UnorderedList>
    </Flex>
  ) : (
    <p>Error :^(</p>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const courses = await invokeWithMiddleware(getCourses, null, context)
  return {
    props: { courses }
  }
}

CoursesView.suppressFirstRenderFlicker = true
CoursesView.getLayout = (page) => <LoggedInLayout title='Courses'>{page}</LoggedInLayout>
export default CoursesView
