import {
  BlitzPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
  invokeWithMiddleware,
  useMutation,
  useRouter,
  Routes
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

import getDisciplines from 'app/courses/queries/getDisciplines'
import createCourse from 'app/courses/mutations/createCourse'

const CreateCourse: BlitzPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  disciplines,
  error
}) => {
  const router = useRouter()

  const [createCourseMutation] = useMutation(createCourse)

  return disciplines ? (
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
          <BreadcrumbLink href=''>Create Course</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <VStack spacing={2} alignItems='start' mb={6}>
        <Heading>Create Course</Heading>
        <Divider />
      </VStack>
      <Flex w='100%' justifyContent='center'>
        <CourseCreationForm
          submit={async (values) => {
            return await createCourseMutation(values)
          }}
          onSuccess={(id: number) => {
            router.push(Routes.CourseView({ id: id }))
            alert('Success :)')
          }}
          disciplines={disciplines.map((d) => d.name)}
        />
      </Flex>
    </Flex>
  ) : (
    <p>{JSON.stringify(error)}</p>
  )
}

export const getServerSideProps: GetServerSideProps<{
  disciplines?: PromiseReturnType<typeof getDisciplines>
  error?: any
}> = async (context) => {
  try {
    const disciplines = await invokeWithMiddleware(getDisciplines, null, context)
    return {
      props: { disciplines }
    }
  } catch (e) {
    console.log(e)
    return {
      props: { error: e }
    }
  }
}

CreateCourse.suppressFirstRenderFlicker = true
CreateCourse.getLayout = (page) => <LoggedInLayout title='Create Course'>{page}</LoggedInLayout>
export default CreateCourse
