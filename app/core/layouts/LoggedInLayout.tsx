import { ReactNode } from 'react'
import { Head, BlitzLayout } from 'blitz'
import { Flex } from '@chakra-ui/react'
import Sidebar from 'app/core/components/Sidebar'

type LoggedInLayoutProps = {
  title?: string
  children: ReactNode
}

const LoggedInLayout: BlitzLayout<LoggedInLayoutProps> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title || 'blitz-chakra'}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex height="100vh" overflow-y="hidden">
        <Sidebar />
        {children}
      </Flex>
    </>
  )
}

LoggedInLayout.authenticate = true
export default LoggedInLayout
