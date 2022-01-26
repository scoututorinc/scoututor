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
import {
  BlitzPage,
  useRouter,
  useParam,
  useQuery,
  Routes,
  invokeWithMiddleware,
  GetServerSideProps,
  PromiseReturnType,
  InferGetServerSidePropsType
} from 'blitz'
import Post from 'app/courses/components/Post'
import LoggedInLayout from 'app/core/layouts/LoggedInLayout'
import { paramToInt } from 'utils'

const CoursePosts: BlitzPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  course
}) => {
  return course ? (
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

export const getServerSideProps: GetServerSideProps<{
  course?: PromiseReturnType<typeof getCourse>
  permissions?: {
    canUpdateCourse: boolean
    canJoinCourse: boolean
  }
  error?: any
  redirect?: any
}> = async (context) => {
  try {
    const courseId = paramToInt(context?.params?.id)
    const course = await invokeWithMiddleware(getCourse, courseId, context)

    if (!course)
      return {
        redirect: {
          destination: Routes.CoursesView(),
          permanent: false
        }
      }
    else
      return {
        props: {
          course
        }
      }
  } catch (e) {
    console.log(e)
    return {
      props: { error: e }
    }
  }
}

CoursePosts.suppressFirstRenderFlicker = true
CoursePosts.getLayout = (page) => <LoggedInLayout title='Course Posts'>{page}</LoggedInLayout>

export default CoursePosts
