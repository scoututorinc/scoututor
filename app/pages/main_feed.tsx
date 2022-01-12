import React, { useState } from 'react'
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
  Button,
  Heading,
  Icon,
  Text,
  Input,
  Divider,
  Box
} from '@chakra-ui/react'
import { PromiseReturnType } from 'next/dist/types/utils'
import { StyledLink } from 'app/core/components/StyledLink'
import { MdNotificationsActive } from 'react-icons/md'

import Post from 'app/courses/components/Post'
import LoggedInLayout from 'app/core/layouts/LoggedInLayout'
import getUserEnrolledCourses from 'app/users/queries/getUserMainPageData'
import getNotifications from 'app/users/queries/getNotifications'

const MainFeed: BlitzPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  courses,
  notifications,
  error
}) => {
  const [filterText, setFilterText] = useState('')
  return courses ? (
    <Flex direction='column' w='100%' h='100%' overflowY='scroll' overflowX='hidden' p={10}>
      <Flex direction={{ base: 'column', md: 'row' }} justifyContent='space-between'>
        <VStack w='100%' spacing={2}>
          <HStack w='100%' justifyContent='space-between'>
            <Heading>This is what is happening</Heading>
            {notifications && notifications?.length > 0 ? (
              <StyledLink href={Routes.Notifications()}>
                <Button colorScheme='red'>
                  <HStack spacing={2}>
                    <Icon as={MdNotificationsActive} />
                    <Text>
                      You have {notifications?.length}{' '}
                      {notifications?.length > 1 ? 'notifications' : 'notification'}
                    </Text>
                  </HStack>
                </Button>
              </StyledLink>
            ) : (
              <div></div>
            )}
          </HStack>
          <Divider />
        </VStack>
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
          <VStack w='100%' spacing={2}>
            <HStack w='100%' spacing={4} justifyContent='space-between' alignItems='center'>
              <Heading size='lg'>Latest posts</Heading>
              <Spacer />
              <Input
                maxW='400px'
                placeholder='Search a post for its content'
                focusBorderColor='teal.400'
                onChange={(event) => setFilterText(event.target.value)}
              />
            </HStack>
            <Divider mt={4} />
          </VStack>
          <Spacer />
        </Flex>
      </Flex>
      <Divider />
      {courses.map((course) =>
        course.posts.map((post) => {
          if (post.description.toLowerCase().includes(filterText.toLowerCase())) {
            return <Post key={post.id} courseTitle={course.title} {...post} />
          }
        })
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
  notifications?: PromiseReturnType<typeof getNotifications>
  error?: any
}> = async (context) => {
  try {
    const courses = await invokeWithMiddleware(getUserEnrolledCourses, null, context)
    const notifications = await invokeWithMiddleware(getNotifications, null, context)
    return {
      props: { courses, notifications }
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
