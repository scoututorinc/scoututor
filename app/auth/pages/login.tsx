import { useRouter, BlitzPage } from 'blitz'
import { Center } from '@chakra-ui/react'
import { LoginForm } from 'app/auth/components/LoginForm'
import Navbar from '../../core/components/Navbar'
import LoggedOutLayout from 'app/core/layouts/LoggedOutLayout'

const LoginPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <LoginForm
      onSuccess={() => {
        const next = router.query.next ? decodeURIComponent(router.query.next as string) : '/'
        router.push(next)
      }}
    />
  )
}

LoginPage.redirectAuthenticatedTo = '/'
LoginPage.getLayout = (page) => <LoggedOutLayout title="Log In">{page}</LoggedOutLayout>

export default LoginPage
