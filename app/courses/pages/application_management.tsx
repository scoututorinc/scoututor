import { BlitzPage, useSession } from 'blitz'
import {
  Flex,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  VStack,
  HStack,
  Heading,
  Divider,
  Box,
  Img,
  Text,
  Button,
  Icon
} from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'
import { AiFillMessage } from 'react-icons/ai'
import LoggedInLayout from 'app/core/layouts/LoggedInLayout'
import Application from 'app/courses/components/Application'

const ApplicationManagement: BlitzPage = () => {
  return (
    <Flex
      direction='column'
      p={{ base: 6, md: 10 }}
      width='100%'
      overflowY='scroll'
      overflowX='hidden'
    >
      <Breadcrumb spacing={4} pb={8} separator={<ChevronRightIcon color='gray.500' />}>
        <BreadcrumbItem>
          <BreadcrumbLink href=''>Courses</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href=''>Graphical Design by Bring Your own Laptop</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href=''>Application management</BreadcrumbLink>
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
  )
}

ApplicationManagement.suppressFirstRenderFlicker = true
ApplicationManagement.getLayout = (page) => (
  <LoggedInLayout title='Application management'>{page}</LoggedInLayout>
)
export default ApplicationManagement
