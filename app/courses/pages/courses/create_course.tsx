import { BlitzPage } from 'blitz'
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

const CreateCourse: BlitzPage = () => {
  return (
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
        <Divider></Divider>
      </VStack>
      <Flex w='100%' justifyContent='center'>
        <CourseCreationForm />
      </Flex>
    </Flex>
  )
}

CreateCourse.suppressFirstRenderFlicker = true
CreateCourse.getLayout = (page) => <LoggedInLayout title='Create Course'>{page}</LoggedInLayout>
export default CreateCourse
