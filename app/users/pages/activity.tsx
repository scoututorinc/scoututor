import React, { useState } from 'react'
import { PromiseReturnType } from 'next/dist/types/utils'
import {
  BlitzPage,
  GetServerSideProps,
  invokeWithMiddleware,
  InferGetServerSidePropsType,
  Routes
} from 'blitz'
import {
  Flex,
  Icon,
  Img,
  Button,
  VStack,
  HStack,
  Heading,
  Divider,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink
} from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'
import LoggedInLayout from 'app/core/layouts/LoggedInLayout'
import Application from 'app/courses/components/Application'
import getCurrentUserCourses from 'app/users/queries/getCurrentUserCourses'
import getCurrentUserApplications from 'app/users/queries/getCurrentUserApplications'
import { StyledLink } from 'app/core/components/StyledLink'
import getCurrentUser from 'app/users/queries/getCurrentUser'
import { BsFillPersonFill } from 'react-icons/bs'
import { MdEmail, MdLocationPin } from 'react-icons/md'

const Activity: BlitzPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  currentUser,
  currentUserCourses,
  currentUserApplications,
  error
}) => {
  const [applications, setapplications] = useState(currentUserApplications)

  return currentUserCourses && currentUserApplications ? (
    <Flex direction='column' p={{ base: 6, md: 10 }} width='100%' height='100vh'>
      <Breadcrumb spacing={4} pb={8} separator={<ChevronRightIcon color='gray.500' />}>
        <BreadcrumbItem>
          <BreadcrumbLink href={Routes.Activity().pathname}>Profile</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <Flex direction='row' w='100%' h='100%' overflowX='hidden'>
        <VStack spacing={2} justifyContent='center' h='100%' overflowY='hidden' minW='15%'>
          <Img
            src={currentUser?.profilePicture || '/image/profile.png'}
            alt='profile_pic'
            maxW='75px'
            mb={2}
            borderRadius='full'
          />
          <HStack spacing={2}>
            <Icon as={BsFillPersonFill} />
            <Heading size='sm'>{currentUser?.name} </Heading>
          </HStack>
          <HStack spacing={2}>
            <Icon as={MdEmail} />
            <Heading size='sm'>{currentUser?.email}</Heading>
          </HStack>
          <HStack spacing={2} mb={4}>
            <Icon as={MdLocationPin} />
            <Heading size='sm'>
              {currentUser?.municipality
                ? currentUser?.district + ', ' + currentUser?.municipality
                : currentUser?.district}
            </Heading>
          </HStack>
          <StyledLink href={Routes.Profile()}>
            <Button colorScheme='teal'>Edit profile</Button>
          </StyledLink>
        </VStack>
        <Divider orientation='vertical' mx={6} />
        <VStack alignItems='start' w='100%' h='100%' overflowY='scroll'>
          <VStack spacing={2} alignItems='start' w='100%' mb={10}>
            <Heading>Activity</Heading>
            <Divider />
          </VStack>
          <VStack spacing={2} alignItems='start' w='100%' mb={4}>
            <Heading size='lg'>Your created courses</Heading>
            <Divider mb={2} />
            {currentUserCourses.map((course) => (
              <StyledLink key={course.id} href={Routes.CourseView({ id: course.id })}>
                <Button colorScheme='teal'>{course.title}</Button>
              </StyledLink>
            ))}
          </VStack>

          <VStack spacing={2} alignItems='start' w='100%' mt={10} mb={4}>
            <Heading size='lg'>Your applications</Heading>
            <Divider />
            {applications?.map((application, i) => (
              <Application
                isAuthor
                key={application.id || i}
                {...application}
                onConclude={() =>
                  setapplications(applications?.filter((a) => a.id != application.id))
                }
              />
            ))}
          </VStack>
        </VStack>
      </Flex>
    </Flex>
  ) : (
    <p>{JSON.stringify(error)}</p>
  )
}

export const getServerSideProps: GetServerSideProps<{
  currentUser?: PromiseReturnType<typeof getCurrentUser>
  currentUserCourses?: PromiseReturnType<typeof getCurrentUserCourses>
  currentUserApplications?: PromiseReturnType<typeof getCurrentUserApplications>
  error?: any
}> = async ({ req, res }) => {
  try {
    const currentUser = await invokeWithMiddleware(getCurrentUser, null, { req, res })
    const currentUserCourses = await invokeWithMiddleware(getCurrentUserCourses, null, { req, res })
    const currentUserApplications = await invokeWithMiddleware(getCurrentUserApplications, null, {
      req,
      res
    })
    return {
      props: { currentUser, currentUserCourses, currentUserApplications }
    }
  } catch (e) {
    console.log(e)
    return {
      props: { error: e }
    }
  }
}

Activity.suppressFirstRenderFlicker = true
Activity.getLayout = (page) => <LoggedInLayout title='Activity'>{page}</LoggedInLayout>
export default Activity
