import { ReactNode } from 'react'
import { Routes, BlitzLayout, Head } from 'blitz'
import { Box, Center } from '@chakra-ui/react'
import Navbar from 'app/core/components/Navbar'

type LoggedOutLayoutProps = {
  title?: string
  children: ReactNode
}

const LoggedOutLayout: BlitzLayout<LoggedOutLayoutProps> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title || 'blitz-chakra'}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box height="100vh">
        <Navbar />
        <Center>{children}</Center>
      </Box>
    </>
  )
}

//TODO: This redirect causes issues on the auth flow, if we do a dynamic (user/no user) navbar, this page feels natural
//TODO: Maybe allow users logged in to view this page, likely needs a DynamicLayout
// LoggedOutLayout.redirectAuthenticatedTo = Routes.MainFeed()
export default LoggedOutLayout
