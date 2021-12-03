import React, { useState, useRef } from 'react'
import { PromiseReturnType } from 'next/dist/types/utils'
import {
  BlitzPage,
  GetServerSideProps,
  invokeWithMiddleware,
  InferGetServerSidePropsType,
  useRouter,
  useMutation,
  Routes
} from 'blitz'
import { Flex, Button, VStack, Heading, Divider, Img } from '@chakra-ui/react'
import { BiEdit } from 'react-icons/bi'

import LoggedInLayout from 'app/core/layouts/LoggedInLayout'
import { SimpleAlertDialog } from 'app/core/components/SimpleAlertDialog'
import { Form } from 'app/core/components/forms/Form'

import getCurrentUser from 'app/users/queries/getCurrentUser'
import logout from 'app/auth/mutations/logout'
import deleteAccount from 'app/auth/mutations/deleteAccount'
import { LabeledTextField } from 'app/core/components/forms/LabeledTextField'

const Profile: BlitzPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  currentUser,
  error
}) => {
  const router = useRouter()
  const [logoutMutation] = useMutation(logout)
  const [deleteAccMutation] = useMutation(deleteAccount)

  const [isOpen, setIsOpen] = useState(false)
  const onClose = () => setIsOpen(false)
  const cancelRef = useRef(null)

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
        <Flex direction='column' w={{ base: '90%', lg: '30%' }}>
          <Form onSubmit={async () => {}}>
            <Flex direction='column' w='100%'>
              <VStack spacing={4} mb={6} w='100%'>
                <LabeledTextField label='Name' name='name' placeholder={currentUser.name} />
                <LabeledTextField label='Email' name='email' placeholder={currentUser.email} />
                <LabeledTextField label='Password' name='password' placeholder='*******' />
              </VStack>
              <VStack spacing={4} w='100%'>
                <Button type='submit' colorScheme='teal' w={{ base: '90%', lg: '60%' }}>
                  Confirm changes
                </Button>
                <Button
                  colorScheme='red'
                  w={{ base: '90%', lg: '60%' }}
                  onClick={() => {
                    setIsOpen(true)
                  }}
                >
                  Delete Account
                </Button>
              </VStack>
            </Flex>
          </Form>
        </Flex>
        <SimpleAlertDialog
          header='Delete Account'
          body='Are you sure? You cannot undo this action afterwards.'
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <Button ref={cancelRef} onClick={onClose}>
            Cancel
          </Button>
          <Button
            colorScheme='red'
            onClick={async () => {
              try {
                await deleteAccMutation()
                await logoutMutation()
                await router.push(Routes.Home())
              } catch (error: any) {
                alert(
                  'Your account has active memberships and could not be deleted. If you wish to delete your account, make sure to cancel all  your memberships beforehand'
                )
                onClose()
              }
            }}
          >
            Delete
          </Button>
        </SimpleAlertDialog>
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
