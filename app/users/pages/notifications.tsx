import { Button, Divider, Flex, Heading, HStack, Spacer, VStack } from '@chakra-ui/react'
import LoggedInLayout from 'app/core/layouts/LoggedInLayout'
import {
  BlitzPage,
  InferGetServerSidePropsType,
  GetServerSideProps,
  PromiseReturnType,
  invokeWithMiddleware,
  useMutation,
  useRouter,
  Routes
} from 'blitz'
import dismissAllNotifications from '../mutations/dismissAllNotifications'
import dismissNotification from '../mutations/dismissNotification'
import getCurrentUser from '../queries/getCurrentUser'
import getNotifications from '../queries/getNotifications'

const Notifications: BlitzPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  currentUser,
  notifications,
  error
}) => {
  const router = useRouter()
  const [dismissNotificationMutation] = useMutation(dismissNotification)
  const [dismissAllNotificationsMutation] = useMutation(dismissAllNotifications)
  return currentUser && notifications ? (
    <Flex direction='column' w='100%' h='100%' overflowY='scroll' overflowX='hidden' p={10}>
      <Flex direction={{ base: 'column', md: 'row' }} justifyContent='space-between'>
        <VStack spacing={2}>
          <HStack w='100%' spacing={45} justifyContent='space-between' alignItems='center'>
            <Heading size='lg'>Your Notifications</Heading>
            <Spacer />
            <Button
              colorScheme='red'
              onClick={async () => {
                dismissAllNotificationsMutation()
                notifications.splice(0, notifications.length)
              }}
            >
              Dismiss All
            </Button>
          </HStack>
          <Divider />
        </VStack>
      </Flex>
      <Flex direction={{ base: 'column', sm: 'row' }} gap={4} mt={4} wrap='wrap'>
        {notifications.map((notif) => {
          return (
            <VStack key={notif.id}>
              <p>{JSON.stringify(notif)}</p>
              <Button
                colorScheme='red'
                onClick={async () => {
                  dismissNotificationMutation(notif.id)
                  notifications.splice(notifications.indexOf(notif), 1)
                }}
              >
                {' '}
                Dismiss
              </Button>
            </VStack>
          )
        })}
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
