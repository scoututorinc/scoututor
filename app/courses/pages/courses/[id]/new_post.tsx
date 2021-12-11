import { BlitzPage, Routes, useParam } from 'blitz'
import { Breadcrumb, BreadcrumbItem, Flex, VStack, Heading, Divider, Text } from '@chakra-ui/react'
import LoggedInLayout from 'app/core/layouts/LoggedInLayout'
import { ChevronRightIcon } from '@chakra-ui/icons'
import { PostCreationForm } from 'app/courses/components/PostCreationForm'
import { StyledLink } from 'app/core/components/StyledLink'

const NewPost: BlitzPage = () => {
  const courseId = useParam('id', 'string')

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
          <StyledLink href={Routes.CoursesView()}>
            <Text>Courses</Text>
          </StyledLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <StyledLink href={Routes.CourseView({ id: courseId! })}>
            <Text>Current course</Text>
          </StyledLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Text>Create post</Text>
        </BreadcrumbItem>
      </Breadcrumb>
      <VStack spacing={2} alignItems='start' mb={6}>
        <Heading>Create post</Heading>
        <Divider />
      </VStack>
      <Flex w='100%' h='100%' justifyContent='center'>
        <PostCreationForm />
      </Flex>
    </Flex>
  )
}

NewPost.suppressFirstRenderFlicker = true
NewPost.getLayout = (page) => <LoggedInLayout title='Create post'>{page}</LoggedInLayout>
export default NewPost
