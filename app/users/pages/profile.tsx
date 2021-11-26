import { BlitzPage } from 'blitz'
import { Flex, Box } from '@chakra-ui/react'

import LoggedInLayout from 'app/core/layouts/LoggedInLayout'
import { useCurrentUser } from 'app/core/hooks/useCurrentUser'

const Profile: BlitzPage = () => {
  const currentUser = useCurrentUser()

  return currentUser ? (
    <Flex direction='column' w='100%' h='100%' overflowY='scroll' overflowX='hidden' p={10}>
      <Box as='pre'>{JSON.stringify(currentUser, null, 2)}</Box>
    </Flex>
  ) : (
    <p>Error :^(</p>
  )
}

Profile.suppressFirstRenderFlicker = true
Profile.getLayout = (page) => <LoggedInLayout title='Courses'>{page}</LoggedInLayout>
export default Profile
