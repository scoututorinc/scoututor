import React, { useState, useRef } from 'react'
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
  VStack,
  Heading,
  Divider,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Spacer
} from '@chakra-ui/react'
import LoggedInLayout from 'app/core/layouts/LoggedInLayout'
import { SimpleAlertDialog } from 'app/core/components/SimpleAlertDialog'

import getCurrentUser from 'app/users/queries/getCurrentUser'
import { EditProfileForm } from 'app/users/components/EditProfileForm'
import { ChevronRightIcon } from '@chakra-ui/icons'

const Profile: BlitzPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  currentUser,
  error
}) => {
  return currentUser ? (
    <Flex direction='column' w='100%' h='100%' overflowY='scroll' overflowX='hidden' p={10}>
      <Breadcrumb spacing={4} pb={8} separator={<ChevronRightIcon color='gray.500' />}>
        <BreadcrumbItem>
          <BreadcrumbLink href={Routes.Activity().pathname}>Profile</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href={Routes.Profile().pathname}>Edit profile</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <VStack>
        <VStack spacing={2} alignItems='start' w='100%' mb={6}>
          <Heading>Profile</Heading>
          <Divider />
        </VStack>
        <EditProfileForm
          defaultValues={{
            name: currentUser.name,
            email: currentUser.email,
            profilePicture: currentUser.profilePicture
          }}
        />
      </VStack>
    </Flex>
  ) : (
    <p>{JSON.stringify(error)}</p>
  )
}

export const getServerSideProps: GetServerSideProps<{
  currentUser?: PromiseReturnType<typeof getCurrentUser>
  error?: any
}> = async ({ req, res }) => {
  try {
    const currentUser = await invokeWithMiddleware(getCurrentUser, null, { req, res })
    return {
      props: { currentUser }
    }
  } catch (e) {
    console.log(e)
    return {
      props: { error: e }
    }
  }
}

Profile.suppressFirstRenderFlicker = true
Profile.getLayout = (page) => <LoggedInLayout title='Courses'>{page}</LoggedInLayout>
export default Profile
