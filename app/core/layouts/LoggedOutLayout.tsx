import { ReactNode } from 'react'
import { BlitzLayout, Head } from 'blitz'
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

LoggedOutLayout.redirectAuthenticatedTo = '/'
export default LoggedOutLayout
