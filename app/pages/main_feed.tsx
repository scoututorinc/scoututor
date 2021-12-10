import { Routes } from 'blitz'
import {
  BlitzPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
  invokeWithMiddleware
} from 'blitz'
import {
  Flex,
  Spacer,
  HStack,
  VStack,
  Stack,
  Button,
  Heading,
  Input,
  Divider,
  Box
} from '@chakra-ui/react'
import { PromiseReturnType } from 'next/dist/types/utils'
import { StyledLink } from 'app/core/components/StyledLink'

import { SearchIcon } from '@chakra-ui/icons'
import Post from 'app/courses/components/Post'
import LoggedInLayout from 'app/core/layouts/LoggedInLayout'
import getUserEnrolledCourses from 'app/users/queries/getUserEnrolledCourses'

const MainFeed: BlitzPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  courses,
  error
}) => {
  const currently_enrolled_courses = ['Mathematics', 'Geography', 'Graphic Design']
  return courses ? (
    <Flex direction='column' w='100%' h='100%' overflowY='scroll' overflowX='hidden' p={10}>
      <Flex direction={{ base: 'column', md: 'row' }} justifyContent='space-between'>
        <VStack spacing={2}>
          <Heading>This is what is happening</Heading>
          <Divider />
        </VStack>
        <Spacer />
        <HStack width={{ base: '100%', md: '30%' }} spacing={4}>
          <Input focusBorderColor='teal.400' type='text' placeholder='What are you looking for?' />
          <Button colorScheme='teal'>
            <SearchIcon color='gray.700' />
          </Button>
        </HStack>
      </Flex>
      <Flex direction='column' mt={14}>
        <Flex>
          <VStack spacing={2}>
            <Heading size='lg'>Currently enrolled courses</Heading>
            <Divider mt={4} />
          </VStack>
          <Spacer />
        </Flex>
        <Flex direction={{ base: 'column', sm: 'row' }} gap={4} mt={4} wrap='wrap'>
          {courses.map((course) => (
            <StyledLink key={course.id} href={Routes.CourseView({ id: course.id })} p={2}>
              <Button colorScheme='teal'>{course.title}</Button>
            </StyledLink>
          ))}
        </Flex>
      </Flex>
      <Flex direction='column' mt={14}>
        <Flex>
          <VStack spacing={2}>
            <Heading size='lg'>Latest posts</Heading>
            <Divider mt={4} />
          </VStack>
          <Spacer />
        </Flex>
      </Flex>
      <Divider />
      {courses.map((course) =>
        course.posts.map((post) => (
          <Post key={post.id} courseTitle={course.title} author={course.author} {...post} />
        ))
      )}
    </Flex>
  ) : (
    <Box>
      Error :(
      <pre>{JSON.stringify(error, null, 2)}</pre>
    </Box>
  )
}

export const getServerSideProps: GetServerSideProps<{
  courses?: PromiseReturnType<typeof getUserEnrolledCourses>
  error?: any
}> = async (context) => {
  try {
    const courses = await invokeWithMiddleware(getUserEnrolledCourses, null, context)
    return {
      props: { courses }
    }
  } catch (e) {
    console.log(e)
    return {
      props: { error: e }
    }
  }
}

MainFeed.suppressFirstRenderFlicker = true
MainFeed.getLayout = (page) => <LoggedInLayout title='Main Feed'>{page}</LoggedInLayout>
export default MainFeed
