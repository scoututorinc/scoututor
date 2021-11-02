import { useRouter, BlitzPage, Routes } from 'blitz'
import { Center } from '@chakra-ui/react'
import Layout from 'app/core/layouts/Layout'
import { SignupForm } from 'app/auth/components/SignupForm'
import Navbar from '../../core/components/Navbar'

const SignupPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <div>
      <Navbar />
      <Center>
        <SignupForm onSuccess={() => router.push(Routes.Home())} />
      </Center>
    </div>
  )
}

SignupPage.redirectAuthenticatedTo = '/'
SignupPage.getLayout = (page) => <Layout title="Sign Up">{page}</Layout>

export default SignupPage
