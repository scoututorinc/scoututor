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
import { Flex, Box, Button, VStack } from '@chakra-ui/react'

import LoggedInLayout from 'app/core/layouts/LoggedInLayout'
import { SimpleAlertDialog } from 'app/core/components/SimpleAlertDialog'

import getCurrentUser from 'app/users/queries/getCurrentUser'
import logout from 'app/auth/mutations/logout'
import deleteAccount from 'app/auth/mutations/deleteAccount'

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
        <Box as='pre'>{JSON.stringify(currentUser, null, 2)}</Box>
        <Button
          type='submit'
          colorScheme='red'
          onClick={() => {
            setIsOpen(true)
          }}
        >
          Delete Account
        </Button>
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
