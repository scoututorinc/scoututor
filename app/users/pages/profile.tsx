import {
  BlitzPage,
  GetServerSideProps,
  invokeWithMiddleware,
  InferGetServerSidePropsType
} from 'blitz'
import { Flex, Box } from '@chakra-ui/react'

import LoggedInLayout from 'app/core/layouts/LoggedInLayout'
import getCurrentUser from 'app/users/queries/getCurrentUser'

const Profile: BlitzPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  currentUser
}) => {
  return currentUser ? (
    <Flex direction='column' w='100%' h='100%' overflowY='scroll' overflowX='hidden' p={10}>
      <Box as='pre'>{JSON.stringify(currentUser, null, 2)}</Box>
    </Flex>
  ) : (
    <p>Error :^(</p>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const currentUser = await invokeWithMiddleware(getCurrentUser, null, { req, res })
  return {
    props: { currentUser }
  }
}

Profile.suppressFirstRenderFlicker = true
Profile.getLayout = (page) => <LoggedInLayout title='Courses'>{page}</LoggedInLayout>
export default Profile
