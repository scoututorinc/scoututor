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
  creator: { id: number; name: string }
  onDismiss: () => void
}

const notificationTypeToReadable = (type: string, creator: { id: number; name: string }) => {
  switch (type) {
    case 'APPLICATION_CREATE':
      return creator.name + ' submitted an application'
    case 'APPLICATION_CANCEL':
      return creator.name + ' canceled his application'
    case 'APPLICATION_ACCEPT':
      return 'Your application has been accepted'
    case 'APPLICATION_DECLINE':
      return 'Your application has been declined'
    case 'APPLICATION_COMMENT':
      return creator.name + ' submitted a follow up comment'
    case 'MEMBERSHIP_CANCEL':
      return 'Your membership has been canceled'
    case 'MEMBERSHIP_LEAVE':
      return creator.name + ' canceled his membership'
  }
}
const Notification = ({
  course,
  id,
  createdAt,
  type,
  entityId,
  creator,
  onDismiss
}: notifProps) => {
  const [dismissNotificationMutation] = useMutation(dismissNotification)

  return (
    <Box borderWidth='2px' borderRadius={6} w='100%'>
      <HStack w='100%' px={4} py={2} justifyContent='space-between'>
        <HStack>
          <Img src={course.previewImage} w='50px' h='50px' objectFit='cover' borderRadius='full' />
          <Heading as='h2' size='sm'>
            {course.title} - {notificationTypeToReadable(type, creator)}
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
