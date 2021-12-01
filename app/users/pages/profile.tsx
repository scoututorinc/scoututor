import {
  BlitzPage,
  GetServerSideProps,
  invokeWithMiddleware,
  InferGetServerSidePropsType,
  useRouter,
  useMutation,
  Routes
} from 'blitz'
import {
  AlertDialog,
  Flex,
  Box,
  Button,
  VStack,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay
} from '@chakra-ui/react'

import LoggedInLayout from 'app/core/layouts/LoggedInLayout'
import getCurrentUser from 'app/users/queries/getCurrentUser'
import React from 'react'
import logout from 'app/auth/mutations/logout'
import deleteAccount from 'app/auth/mutations/deleteAccount'

import { PromiseReturnType } from 'next/dist/types/utils'

const Profile: BlitzPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  currentUser,
  error
}) => {
  const router = useRouter()
  const [logoutMutation] = useMutation(logout)
  const [deleteAccMutation] = useMutation(deleteAccount)
  const [isOpen, setIsOpen] = React.useState(false)
  const onClose = () => setIsOpen(false)
  const cancelRef = React.useRef()
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
        <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                Delete Account
              </AlertDialogHeader>

              <AlertDialogBody>
                Are you sure? You cannot undo this action afterwards.
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  colorScheme='red'
                  onClick={async () => {
                    await deleteAccMutation()
                    await logoutMutation()
                    await router.push(Routes.Home())
                  }}
                >
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
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
