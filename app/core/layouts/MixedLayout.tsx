import { ReactNode } from 'react'
import { Routes, BlitzLayout, Head } from 'blitz'
import { Box, Center } from '@chakra-ui/react'
import Navbar from 'app/core/components/Navbar'

type MixedLayoutProps = {
  title?: string
  children: ReactNode
}

const MixedLayout: BlitzLayout<MixedLayoutProps> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title || 'blitz-chakra'}</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Box height='100vh'>
        <Navbar />
        <Center>{children}</Center>
      </Box>
    </>
  )
}

export default MixedLayout
