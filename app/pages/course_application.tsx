import { BlitzPage, useSession } from 'blitz'
import {
  Flex,
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  HStack,
  VStack,
  Heading,
  Divider,
  Img
} from '@chakra-ui/react'
import LoggedInLayout from 'app/core/layouts/LoggedInLayout'
import { ChevronRightIcon } from '@chakra-ui/icons'
import { CourseApplicationForm } from 'app/courses/components/CourseApplicationForm'

const CourseApplication: BlitzPage = () => {
  return (
    <Flex direction='column' w='100%' h='100%' overflowY='scroll' overflowX='hidden' p={10}>
      <Breadcrumb spacing={4} pb={8} separator={<ChevronRightIcon />}>
        <BreadcrumbItem>
          <BreadcrumbLink href=''>Graphical Design by Bring Your Own Laptop</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href=''>Application</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <VStack spacing={2} alignItems='start' mb={6}>
        <Heading>Graphical Design by Bring Your Own Laptop Application</Heading>
        <Divider />
      </VStack>
      <Flex width='100%' justifyContent='center'>
        <CourseApplicationForm />
      </Flex>
    </Flex>
  )
}

CourseApplication.suppressFirstRenderFlicker = true
CourseApplication.getLayout = (page) => (
  <LoggedInLayout title='Course Application'>{page}</LoggedInLayout>
)
export default CourseApplication
