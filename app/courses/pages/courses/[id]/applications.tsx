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
import getCourseApplications from 'app/courses/queries/getCourseApplications'
import { PromiseReturnType } from 'next/dist/types/utils'
import { paramToInt } from 'utils'
import { useState } from 'react'

const Applications: BlitzPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  course
}) => {
  const [applications, setapplications] = useState(course?.applications)

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
          <BreadcrumbLink href={Routes.CoursesView().pathname}>Courses</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href={Routes.CourseView({ id: course.id }).pathname}>
            {course.title}
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
        {applications?.map((application, i) => (
          <Application
            isAuthor={false}
            key={application.id || i}
            {...application}
            onConclude={() => setapplications(applications?.filter((a) => a.id != application.id))}
          />
        ))}
      </VStack>
    </Flex>
  ) : (
    <p>Error fetching course</p>
  )
}

export const getServerSideProps: GetServerSideProps<{
  course?: PromiseReturnType<typeof getCourseApplications>
}> = async (context) => {
  const course = await invokeWithMiddleware(
    getCourseApplications,
    paramToInt(context?.params?.id),
    context
  )
  return {
    props: { course }
  }
}

Applications.suppressFirstRenderFlicker = true
Applications.getLayout = (page) => <LoggedInLayout title='Applications'>{page}</LoggedInLayout>
export default Applications
