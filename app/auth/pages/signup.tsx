import { useRouter, BlitzPage, Routes } from 'blitz'
import { Center } from '@chakra-ui/react'
import LoggedOutLayout from 'app/core/layouts/LoggedOutLayout'
import { SignupForm } from 'app/auth/components/SignupForm'
import Navbar from '../../core/components/Navbar'

const SignupPage: BlitzPage = () => {
  const router = useRouter()

  return <SignupForm onSuccess={() => router.push(Routes.Home())} />
}

SignupPage.redirectAuthenticatedTo = '/'
SignupPage.getLayout = (page) => <LoggedOutLayout title="Sign Up">{page}</LoggedOutLayout>

export default SignupPage
