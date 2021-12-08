import React, { useState, useRef } from 'react'
import { PromiseReturnType } from 'next/dist/types/utils'
import {
  BlitzPage,
  GetServerSideProps,
  invokeWithMiddleware,
  InferGetServerSidePropsType,
  useRouter,
  useMutation,
  Routes,
  validateZodSchema
} from 'blitz'
import { Flex, Button, VStack, HStack, Heading, Divider, Img } from '@chakra-ui/react'
import { BiEdit } from 'react-icons/bi'
import { Form as FinalForm } from 'react-final-form'
import { Form } from 'app/core/components/forms/Form'
import LoggedInLayout from 'app/core/layouts/LoggedInLayout'
import { SimpleAlertDialog } from 'app/core/components/SimpleAlertDialog'

import getCurrentUser from 'app/users/queries/getCurrentUser'
import logout from 'app/auth/mutations/logout'
import deleteAccount from 'app/auth/mutations/deleteAccount'
import updateProfile from 'app/auth/mutations/updateProfile'
import { LabeledTogglebleTextField } from 'app/core/components/forms/LabeledTogglebleTextField'
import { UpdateProfile } from 'app/auth/validations'
import { LabeledTextField } from 'app/core/components/forms/LabeledTextField'
import { MdAlternateEmail } from 'react-icons/md'
import { EditProfileForm } from 'app/users/components/EditProfileForm'

const Profile: BlitzPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  currentUser,
  error
}) => {
  const router = useRouter()
  const [logoutMutation] = useMutation(logout)
  const [deleteAccMutation] = useMutation(deleteAccount)
  const [updateProfileMutation] = useMutation(updateProfile)

  const [isOpen, setIsOpen] = useState(false)
  const onClose = () => setIsOpen(false)
  const cancelRef = useRef(null)

  const [isOpenUpdate, setIsOpenUpdate] = useState(false)
  const onCloseUpdate = () => setIsOpenUpdate(false)

  return currentUser ? (
    <Flex direction='column' w='100%' h='100%' overflowY='scroll' overflowX='hidden' p={10}>
      <VStack>
        <VStack spacing={2} alignItems='start' w='100%' mb={6}>
          <Heading>Profile</Heading>
          <Divider />
        </VStack>
        <Img
          src={currentUser.profilePicture || '/images/profile.png'}
          maxWidth='150px'
          mb={2}
          borderRadius='full'
        />
        <Button leftIcon={<BiEdit />} variant='ghost'>
          {' '}
          Edit profile picture{' '}
        </Button>
        <EditProfileForm
          defaultValues={{
            name: currentUser.name,
            email: currentUser.email
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
