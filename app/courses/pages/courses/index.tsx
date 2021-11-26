import { BlitzPage, useQuery, Routes, Link as BlitzLink } from 'blitz'
import { Heading, UnorderedList, ListItem, Flex, Link as ChakraLink } from '@chakra-ui/react'

import LoggedInLayout from 'app/core/layouts/LoggedInLayout'
import getCourses from 'app/courses/queries/getCourses'
import { StyledLink } from 'app/core/components/StyledLink'

const CoursesView: BlitzPage = () => {
  const [courses, status] = useQuery(getCourses, null, {
    suspense: false
  })

  return status.isError == false && courses ? (
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

CoursesView.suppressFirstRenderFlicker = true
CoursesView.getLayout = (page) => <LoggedInLayout title='Courses'>{page}</LoggedInLayout>
export default CoursesView
