import { ChevronRightIcon } from '@chakra-ui/icons'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Divider,
  Flex,
  Heading,
  VStack
} from '@chakra-ui/react'
import getCourse from 'app/courses/queries/getCourse'
import { BlitzPage, useRouter, useParam, useQuery, Routes } from 'blitz'
import Post from 'app/courses/components/Post'
import LoggedInLayout from 'app/core/layouts/LoggedInLayout'

const CoursePosts: BlitzPage = () => {
  const router = useRouter()
  const courseId = useParam('id', 'number')
  const [course, status] = useQuery(getCourse, courseId, {
    suspense: false
  })

  return status.isError == false && course ? (
    <Flex direction='column' w='100%' overflowY='scroll' overflowX='hidden' p={{ base: 4, lg: 10 }}>
      <Breadcrumb spacing={4} pb={8} separator={<ChevronRightIcon />}>
        <BreadcrumbItem>
          <BreadcrumbLink href={Routes.CourseView({ id: course.id.toString() }).pathname}>
            {course.title} by {course.author.name}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href=''>Posts</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <VStack spacing={2} alignItems='start' mb={6}>
        <Heading>Posts</Heading>
        <Divider />
      </VStack>
      <Flex w='100%' direction='column' justifyContent='center'>
        {course.posts.map((post) => (
          <Post key={post.id} courseTitle={course.title} {...post} />
        ))}
      </Flex>
    </Flex>
  ) : (
    <p>Error</p>
  )
}

CoursePosts.suppressFirstRenderFlicker = true
CoursePosts.getLayout = (page) => <LoggedInLayout title='Course Posts'>{page}</LoggedInLayout>

export default CoursePosts
