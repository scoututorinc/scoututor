import {
  BlitzPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
  invokeWithMiddleware,
  Link,
  Routes
} from 'blitz'
import {
  Flex,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  VStack,
  Heading,
  Divider
} from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'
import LoggedInLayout from 'app/core/layouts/LoggedInLayout'
import Application from 'app/courses/components/Application'
import getCourse from 'app/courses/queries/getCourse'

const Applications: BlitzPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  course
}) => {
  return course ? (
    <Flex
      direction='column'
      p={{ base: 6, md: 10 }}
      width='100%'
      overflowY='scroll'
      overflowX='hidden'
    >
      <Breadcrumb spacing={4} pb={8} separator={<ChevronRightIcon color='gray.500' />}>
        <BreadcrumbItem>
          <BreadcrumbLink>
            <Link href={Routes.CoursesView()}>Courses</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink>
            <Link href={Routes.CourseView({ id: course.id })}>{course.title}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink>Applications</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <VStack spacing={4} mb={6} alignItems='start'>
        <Heading size='lg'>Applications management</Heading>
        <Divider />
      </VStack>
      <VStack spacing={4}>
        <Application />
        <Application />
      </VStack>
    </Flex>
  ) : (
    <p>Error fetching course</p>
  )
}

const paramToInt = (param: string | string[] | undefined) => {
  if (typeof param == 'string') return parseInt(param)
  else return -1
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const course = await invokeWithMiddleware(getCourse, paramToInt(context?.params?.id), context)
  return {
    props: { course }
  }
}

Applications.suppressFirstRenderFlicker = true
Applications.getLayout = (page) => <LoggedInLayout title='Applications'>{page}</LoggedInLayout>
export default Applications
