import { useRouter, BlitzPage } from 'blitz'
import { Center } from '@chakra-ui/react'
import Layout from 'app/core/layouts/Layout'
import { LoginForm } from 'app/auth/components/LoginForm'
import Navbar from '../../core/components/Navbar'

const LoginPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <div>
      <Navbar />
      <Center>
        <LoginForm
          onSuccess={() => {
            const next = router.query.next ? decodeURIComponent(router.query.next as string) : '/'
            router.push(next)
          }}
        />
      </Center>
    </div>
  )
}

LoginPage.redirectAuthenticatedTo = '/'
LoginPage.getLayout = (page) => <Layout title="Log In">{page}</Layout>

export default LoginPage
