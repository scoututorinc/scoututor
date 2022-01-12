import React, { useState, useRef } from 'react'
import { Button, Divider, Flex, Heading, HStack, VStack } from '@chakra-ui/react'
import LoggedInLayout from 'app/core/layouts/LoggedInLayout'
import {
  BlitzPage,
  InferGetServerSidePropsType,
  GetServerSideProps,
  PromiseReturnType,
  invokeWithMiddleware,
  useMutation
} from 'blitz'
import dismissAllNotifications from 'app/users/mutations/dismissAllNotifications'
import getCurrentUser from 'app/users/queries/getCurrentUser'
import getNotifications from 'app/users/queries/getNotifications'
import Notification from 'app/users/components/Notification'
import { SimpleAlertDialog } from 'app/core/components/SimpleAlertDialog'

const Notifications: BlitzPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  currentUser,
  notifications,
  error
}) => {
  const [dismissAllNotificationsMutation] = useMutation(dismissAllNotifications)
  const [isDialogOpen, setDialogOpen] = useState(false)
  const onCloseDialog = () => setDialogOpen(false)
  const cancelRef = useRef(null)
  return currentUser && notifications ? (
    <Flex direction='column' w='100%' h='100%' overflowY='scroll' overflowX='hidden' p={10}>
      <Flex direction={{ base: 'column', md: 'row' }} justifyContent='space-between'>
        <VStack w='100%' spacing={2}>
          <HStack w='100%' spacing={45} justifyContent='space-between' alignItems='center'>
            <Heading size='lg'>Your notifications</Heading>
            <Button
              colorScheme='red'
              onClick={async () => {
                setDialogOpen(true)
              }}
            >
              Dismiss All
            </Button>
          </HStack>
          <Divider />
        </VStack>
      </Flex>
      <Flex direction={{ base: 'column', sm: 'row' }} gap={4} mt={4} wrap='wrap'>
        <VStack w='100%' spacing={2}>
          {notifications.map((notif) => {
            return <Notification key={notif.id} notif={notif} notifications={notifications} />
          })}
        </VStack>
        <SimpleAlertDialog
          header="You're dismissing all notifications"
          body='Are you sure you want to dismiss all notifications?'
          leastDestructiveRef={cancelRef}
          isOpen={isDialogOpen}
          onClose={onCloseDialog}
        >
          <Button
            w='150px'
            onClick={() => {
              dismissAllNotificationsMutation()
              notifications.splice(0, notifications.length)
              onCloseDialog()
            }}
            colorScheme='red'
          >
            Yes, dismiss all
          </Button>
          <Button w='150px' onClick={() => onCloseDialog()} colorScheme='teal'>
            No, cancel
          </Button>
        </SimpleAlertDialog>
      </Flex>
    </Flex>
  ) : (
    <p>{JSON.stringify(error)}</p>
  )
}

export const getServerSideProps: GetServerSideProps<{
  currentUser?: PromiseReturnType<typeof getCurrentUser>
  notifications?: PromiseReturnType<typeof getNotifications>
  error?: any
}> = async ({ req, res }) => {
  try {
    const currentUser = await invokeWithMiddleware(getCurrentUser, null, { req, res })
    const notifications = await invokeWithMiddleware(getNotifications, null, { req, res })
    return {
      props: { currentUser, notifications }
    }
  } catch (e) {
    console.log(e)
    return {
      props: { error: e }
    }
  }
}

Notifications.suppressFirstRenderFlicker = true
Notifications.getLayout = (page) => <LoggedInLayout title='Courses'>{page}</LoggedInLayout>
export default Notifications
