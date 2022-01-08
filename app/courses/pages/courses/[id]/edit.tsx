import {
  BlitzPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
  invokeWithMiddleware,
  Routes,
  useRouter,
  useMutation
} from 'blitz'
import { PromiseReturnType } from 'next/dist/types/utils'
import {
  Flex,
  VStack,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Divider
} from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'

import LoggedInLayout from 'app/core/layouts/LoggedInLayout'
import { CourseCreationForm } from 'app/courses/components/CourseCreationForm'

import getCourse from 'app/courses/queries/getCourse'
import editCourse from 'app/courses/mutations/editCourse'
import { paramToInt } from 'utils'

const EditCourse: BlitzPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  course,
  error
}) => {
  const router = useRouter()

  const [editCourseMutation] = useMutation(editCourse)

  return course ? (
    <Flex
      direction='column'
      w='100%'
      h='100%'
      overflowY='scroll'
      overflowX='hidden'
      p={{ base: 4, md: 10 }}
    >
      <Breadcrumb spacing={4} pb={8} separator={<ChevronRightIcon />}>
        <BreadcrumbItem>
          <BreadcrumbLink href=''>Courses</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href=''>Update Course</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <VStack spacing={2} alignItems='start' mb={6}>
        <Heading>Update Course</Heading>
        <Divider />
      </VStack>
      <Flex w='100%' justifyContent='center'>
        <CourseCreationForm
          submit={async (values) => {
            return await editCourseMutation(values)
          }}
          onSuccess={() => {
            alert('Success :)')
            router.push(Routes.CourseView({ id: course.id }))
          }}
          defaultValues={{
            ...course,
            discipline: course.discipline.name,
            knowledgeAreas: course.knowledgeAreas.map((k) => k.name)
          }}
        />
      </Flex>
    </Flex>
  ) : (
    <p>{JSON.stringify(error)}</p>
  )
}

export const getServerSideProps: GetServerSideProps<{
  course?: PromiseReturnType<typeof getCourse>
  error?: any
}> = async (context) => {
  try {
    const course = await invokeWithMiddleware(getCourse, paramToInt(context?.params?.id), context)
    return {
      props: { course }
    }
  } catch (e) {
    console.log(e)
    return {
      props: { error: e }
    }
  }
}

EditCourse.suppressFirstRenderFlicker = true
EditCourse.getLayout = (page) => <LoggedInLayout title='Update Course'>{page}</LoggedInLayout>
export default EditCourse
