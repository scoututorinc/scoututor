import { useRouter, BlitzPage, Routes } from 'blitz'
import LoggedOutLayout from 'app/core/layouts/LoggedOutLayout'
import { SignupForm } from 'app/auth/components/SignupForm'

const SignupPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <SignupForm
      onSuccess={() => {
        router.push(Routes.MainFeed())
      }}
    />
  )
}

SignupPage.getLayout = (page) => <LoggedOutLayout title='Sign Up'>{page}</LoggedOutLayout>

export default SignupPage
