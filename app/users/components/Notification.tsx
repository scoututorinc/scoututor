import { Box, Heading, Button, Img, HStack } from '@chakra-ui/react'
import { useMutation } from 'blitz'
import dismissNotification from 'app/users/mutations/dismissNotification'

const notificationTypeToReadable = (type) => {
  switch (type) {
    case 'APPLICATION_CREATE':
      return 'An application has been submitted'
    case 'APPLICATION_ACCEPT':
      return 'Your application has been accepted'
    case 'APPLICATION_DECLINE':
      return 'Your application has been declined'
    case 'APPLICATION_COMMENT':
      return 'A follow up comment has been submitted'
    case 'MEMBERSHIP_CANCEL':
      return 'A membership has been canceled'
  }
}
const Notification = (props) => {
  const [dismissNotificationMutation] = useMutation(dismissNotification)

  return (
    <Box borderWidth='2px' borderRadius={6} w='100%'>
      <HStack w='100%' px={4} py={2} justifyContent='space-between'>
        <HStack>
          <Img src={props.notif.course.previewImage} maxW='75px' borderRadius='full' />
          <Heading as='h2' size='sm'>
            {props.notif.course.title} - {notificationTypeToReadable(props.notif.type)}
          </Heading>
        </HStack>
        <Button
          colorScheme='red'
          onClick={async () => {
            dismissNotificationMutation(props.notif.id)
            props.onDismiss()
          }}
        >
          Dismiss
        </Button>
      </HStack>
    </Box>
  )
}

export default Notification
