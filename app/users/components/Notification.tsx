import { Box, Heading, Button, Img, HStack } from '@chakra-ui/react'
import { useMutation, useQuery } from 'blitz'
import dismissNotification from 'app/users/mutations/dismissNotification'
import getUser from '../queries/getUser'

interface notifProps {
  course: {
    id: number
    title: string
    previewImage: string
  }
  id: number
  createdAt: Date
  type: string
  entityId: number
  onDismiss: () => void
}

const notificationTypeToReadable = (type: string, entityName?: string) => {
  switch (type) {
    case 'APPLICATION_CREATE':
      return 'An application has been submitted'
    case 'APPLICATION_CANCEL':
      return 'An application has been canceled'
    case 'APPLICATION_ACCEPT':
      return 'Your application has been accepted'
    case 'APPLICATION_DECLINE':
      return 'Your application has been declined'
    case 'APPLICATION_COMMENT':
      return 'A follow up comment has been submitted'
    case 'MEMBERSHIP_CANCEL':
      return 'A membership has been canceled'
    case 'MEMBERSHIP_LEAVE':
      return (entityName ? entityName : 'A student') + ' has canceled his membership'
  }
}
const Notification = ({ course, id, createdAt, type, entityId, onDismiss }: notifProps) => {
  const [dismissNotificationMutation] = useMutation(dismissNotification)
  const [user] = useQuery(getUser, entityId, {
    suspense: false,
    enabled: type == 'MEMBERSHIP_LEAVE'
  })

  return (
    <Box borderWidth='2px' borderRadius={6} w='100%'>
      <HStack w='100%' px={4} py={2} justifyContent='space-between'>
        <HStack>
          <Img src={course.previewImage} maxW='75px' borderRadius='full' />
          <Heading as='h2' size='sm'>
            {course.title} - {notificationTypeToReadable(type, user?.name)}
          </Heading>
        </HStack>
        <Button
          colorScheme='red'
          onClick={async () => {
            dismissNotificationMutation(id)
            onDismiss()
          }}
        >
          Dismiss
        </Button>
      </HStack>
    </Box>
  )
}

export default Notification
