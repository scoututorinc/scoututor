import {
  BlitzPage,
  useQuery,
  useParam,
  useRouter,
  Routes,
  GetServerSideProps,
  PromiseReturnType,
  invokeWithMiddleware,
  InferGetServerSidePropsType
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
import LoggedInLayout from 'app/core/layouts/LoggedInLayout'
import { ChevronRightIcon } from '@chakra-ui/icons'
import { CourseApplicationForm } from 'app/courses/components/CourseApplicationForm'
import getCourse from 'app/courses/queries/getCourse'
import { dateToHourMinString, paramToInt } from 'utils'
import getCourseOwnerAvailableSessions from 'app/calendar/queries/getCourseOwnerAvailableSessions'

const CourseApplication: BlitzPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  availableSessions
}) => {
  const router = useRouter()
  const courseId = useParam('id', 'number')
  const [course, status] = useQuery(getCourse, courseId, {
    suspense: false
  })

  return status.isError == false && course ? (
    <Flex direction='column' w='100%' overflowY='scroll' overflowX='hidden' p={{ base: 4, lg: 10 }}>
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
        {availableSessions ? (
          <CourseApplicationForm
            courseId={course.id}
            availableSessions={availableSessions}
            onSuccess={(id) => router.push(Routes.Activity())}
          />
        ) : (
          'No sessions available :^('
        )}
      </Flex>
    </Flex>
  ) : (
    <p>Error :^(</p>
  )
}

export const getServerSideProps: GetServerSideProps<{
  availableSessions?: PromiseReturnType<typeof getCourseOwnerAvailableSessions>
  error?: any
}> = async (context) => {
  try {
    const availableSessions = await invokeWithMiddleware(
      getCourseOwnerAvailableSessions,
      paramToInt(context.params?.id),
      context
    )
    console.log(
      JSON.stringify(
        availableSessions?.map((s) => ({
          ...s,
          startTime: dateToHourMinString(s.startTime),
          endTime: dateToHourMinString(s.endTime)
        })),
        null,
        2
      )
    )

    return {
      props: { availableSessions }
    }
  } catch (e) {
    return {
      props: { error: e }
    }
  }
}

CourseApplication.suppressFirstRenderFlicker = true
CourseApplication.getLayout = (page) => (
  <LoggedInLayout title='Course Application'>{page}</LoggedInLayout>
)

export default CourseApplication
