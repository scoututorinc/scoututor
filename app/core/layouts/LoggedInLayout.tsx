import { ReactNode } from 'react'
import { Head } from 'blitz'
import { Flex } from '@chakra-ui/react'
import Sidebar from 'app/core/components/Sidebar'

type LoggedInLayoutProps = {
  title?: string
  children: ReactNode
}

const LoggedInLayout = ({ title, children }: LoggedInLayoutProps) => {
  return (
    <>
      <Head>
        <title>{title || 'blitz-chakra'}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex>
        <Sidebar />
        {children}
      </Flex>
    </>
  )
}

export default LoggedInLayout
