import { useRouter, BlitzPage, Routes } from 'blitz'
import LoggedOutLayout from 'app/core/layouts/LoggedOutLayout'
import { SignupForm } from 'app/auth/components/SignupForm'

const SignupPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <div>
      <SignupForm onSuccess={() => router.push(Routes.Home())} />
    </div>
  )
}

SignupPage.redirectAuthenticatedTo = '/'
SignupPage.getLayout = (page) => <LoggedOutLayout title="Sign Up">{page}</LoggedOutLayout>

export default SignupPage
