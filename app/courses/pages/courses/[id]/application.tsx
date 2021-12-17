import { BlitzPage, useQuery, useParam, useRouter, Router, Routes } from 'blitz'
import {
  Flex,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  VStack,
  Heading,
  Divider
} from '@chakra-ui/react'
import LoggedInLayout from 'app/core/layouts/LoggedInLayout'
import { ChevronRightIcon } from '@chakra-ui/icons'
import { CourseApplicationForm } from 'app/courses/components/CourseApplicationForm'
import getCourse from 'app/courses/queries/getCourse'

const CourseApplication: BlitzPage = () => {
  const router = useRouter()
  const courseId = useParam('id', 'number')
  const [course, status] = useQuery(getCourse, courseId, {
    suspense: false
  })

  return status.isError == false && course ? (
    <Flex
      direction='column'
      w='100%'
      h='100%'
      overflowY='scroll'
      overflowX='hidden'
      p={{ base: 4, lg: 10 }}
    >
      <Breadcrumb spacing={4} pb={8} separator={<ChevronRightIcon />}>
        <BreadcrumbItem>
          <BreadcrumbLink href=''>
            {course.title} by {course.author.name}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href=''>Application</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <VStack spacing={2} alignItems='start' mb={6}>
        <Heading>
          {course.title} by {course.author.name} Application
        </Heading>
        <Divider />
      </VStack>
      <Flex width='100%' justifyContent='center'>
        <CourseApplicationForm
          courseId={course.id}
          onSuccess={(id) => router.push(Routes.Applications({ id: courseId || 0 }))}
        />
      </Flex>
    </Flex>
  ) : (
    <p>Error :^(</p>
  )
}

CourseApplication.suppressFirstRenderFlicker = true
CourseApplication.getLayout = (page) => (
  <LoggedInLayout title='Course Application'>{page}</LoggedInLayout>
)
export default CourseApplication
