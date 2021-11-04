import { ReactNode } from 'react'
import { Head } from 'blitz'
import { Box, Flex, Center } from '@chakra-ui/react'
import Navbar from 'app/core/components/Navbar'

type LoggedOutLayoutProps = {
  title?: string
  children: ReactNode
}

const LoggedOutLayout = ({ title, children }: LoggedOutLayoutProps) => {
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

export default LoggedOutLayout
