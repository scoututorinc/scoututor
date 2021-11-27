import {
  BlitzPage,
  GetServerSideProps,
  invokeWithMiddleware,
  InferGetServerSidePropsType,
  useMutation
} from 'blitz'
import { Flex, Heading, Text, VStack, Divider, Img, Button } from '@chakra-ui/react'
import { AiFillLock, AiFillUnlock } from 'react-icons/ai'
import { BiEdit } from 'react-icons/bi'
import Form from 'app/core/components/forms/Form'
import profileUpdate from 'app/users/mutations/profileUpdate'
import { ProfileUpdate } from 'app/users/validations'
import { LabeledTextField } from 'app/core/components/forms/LabeledTextField'

import LoggedInLayout from 'app/core/layouts/LoggedInLayout'
import getCurrentUser from 'app/users/queries/getCurrentUser'
import { valueScaleCorrection } from 'framer-motion/types/render/dom/layout/scale-correction'

type UpdateProfileFormProps = {
  onSuccess?: () => void
}

const Profile: BlitzPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  currentUser,
  props: UpdateProfileFormProps
}) => {
  const [profileUpdateMutation] = useMutation(profileUpdate)
  return currentUser ? (
    <Flex
      direction='column'
      w='100%'
      h='100%'
      alignItems='center'
      overflowY='scroll'
      overflowX='hidden'
      p={10}
    >
      <VStack spacing={2} justifyContent='start' alignItems='start' w='100%' mb={6}>
        <Heading>Profile</Heading>
        <Divider></Divider>
      </VStack>
      <Img
        src={currentUser.profilePicture || '/images/sidebar/profile.png'}
        maxWidth='150px'
        mb={2}
      ></Img>
      <Button leftIcon={<BiEdit />} variant='ghost'>
        Edit profile picture
      </Button>
      <Form
        onSubmit={async (values) => {
          try {
            console.log(values)
            console.log('Tried to update profile')
            // await profileUpdateMutation(values)
          } catch (error: any) {
            console.log(error)
          }
        }}
        initialValues={{ name: '', email: '', password: '' }}
        schema={ProfileUpdate}
      >
        <Flex direction='column' w='100%'>
          <VStack spacing={4} mb={4}>
            <LabeledTextField
              icon={AiFillLock}
              label='Name'
              name='name'
              placeholder={currentUser.name}
            />
            <LabeledTextField
              icon={AiFillLock}
              label='Email'
              name='email'
              placeholder={currentUser.email}
            />
            <LabeledTextField
              icon={AiFillLock}
              label='Password'
              name='password'
              placeholder='*********'
            />
          </VStack>
          <Button type='submit' colorScheme='teal'>
            Confirm changes
          </Button>
        </Flex>
      </Form>
    </Flex>
  ) : (
    <p>Error :^(</p>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const currentUser = await invokeWithMiddleware(getCurrentUser, null, { req, res })
  return {
    props: { currentUser }
  }
}

Profile.suppressFirstRenderFlicker = true
Profile.getLayout = (page) => <LoggedInLayout title='Courses'>{page}</LoggedInLayout>
export default Profile
