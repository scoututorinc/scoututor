import { useRouter, BlitzPage } from 'blitz'
import LoggedOutLayout from 'app/core/layouts/LoggedOutLayout'
import { LoginForm } from 'app/auth/components/LoginForm'

const LoginPage: BlitzPage = () => {
  const router = useRouter()
  return (
    <div>
      <LoginForm
        onSuccess={() => {
          const next = router.query.next ? decodeURIComponent(router.query.next as string) : '/'
          router.push(next)
        }}
      />
    </div>
  )
}

LoginPage.redirectAuthenticatedTo = '/'
LoginPage.getLayout = (page) => <LoggedOutLayout title="Log In">{page}</LoggedOutLayout>

export default LoginPage
