import React, { useState, useRef } from 'react'
import { z } from 'zod'
import { validateZodSchema, useMutation, useRouter, Routes } from 'blitz'

import { UpdateProfileFormPlaceholders, UpdateProfile } from 'app/auth/validations'
import { Form as FinalForm } from 'react-final-form'
import { Flex, Box, HStack, VStack, Button, Img } from '@chakra-ui/react'
import { LabeledTextField } from 'app/core/components/forms/LabeledTextField'
import { LabeledTogglebleTextField } from 'app/core/components/forms/LabeledTogglebleTextField'
import { SimpleAlertDialog } from 'app/core/components/SimpleAlertDialog'
import updateProfile from 'app/auth/mutations/updateProfile'
import deleteAccount from 'app/auth/mutations/deleteAccount'
import logout from 'app/auth/mutations/logout'

import { PickerOverlay } from 'filestack-react'
import { BiEdit } from 'react-icons/bi'

type EditProfileFormProps = {
  onSuccess?: () => void
  defaultValues?: z.infer<typeof UpdateProfileFormPlaceholders>
}

export const EditProfileForm = ({ defaultValues, onSuccess }: EditProfileFormProps) => {
  const router = useRouter()

  const [isOpenUpdate, setIsOpenUpdate] = useState(false)
  const onCloseUpdate = () => setIsOpenUpdate(false)
  const [isOpenDelete, setIsOpenDelete] = useState(false)
  const onCloseDelete = () => setIsOpenDelete(false)
  const cancelRef = useRef(null)

  const [isOpenResultInformer, setIsOpenResultInformer] = useState({ status: false, reload: false })
  const onCloseResultInformer = () => setIsOpenResultInformer({ status: false, reload: false })

  const [updateProfileMutation] = useMutation(updateProfile)
  const [deleteAccMutation] = useMutation(deleteAccount)
  const [logoutMutation] = useMutation(logout)

  const [isUploading, setIsUploading] = useState(false)
  const [profilePicture, setProfilePicture] = useState(defaultValues?.profilePicture)

  return (
    <Flex direction='column' w={{ base: '90%', lg: '30%' }}>
      <FinalForm
        validate={validateZodSchema(UpdateProfile)}
        initialValues={{
          name: null,
          email: null,
          profilePicture: null,
          password: null,
          currentPassword: undefined
        }}
        debug={console.log}
        onSubmit={async (values) => {
          await updateProfileMutation({ ...values, profilePicture })
          setIsOpenUpdate(false)
          if (values.email || values.password) {
            setIsOpenResultInformer({ status: true, reload: false })
          } else {
            setIsOpenResultInformer({ status: true, reload: true })
          }
        }}
        render={({ form, handleSubmit, submitting, values }) => (
          <form onSubmit={handleSubmit}>
            <VStack>
              <Img
                src={profilePicture || '/images/sidebar/profile.png'}
                maxWidth='150px'
                maxHeight='150px'
                mb={2}
                borderRadius='full'
                onClick={() => setIsUploading(true)}
              />
              <Button leftIcon={<BiEdit />} variant='ghost' onClick={() => setIsUploading(true)}>
                Edit profile picture
              </Button>
              {isUploading && (
                <PickerOverlay
                  apikey='AzwEASTdfQ5OYbBHxlAxrz'
                  onSuccess={(res) => {
                    setIsUploading(false)
                    setProfilePicture(res.filesUploaded[0].url)
                  }}
                  onUploadDone={(res) => res}
                  pickerOptions={{ accept: 'image/*', imageDim: [300, 300] }}
                />
              )}
            </VStack>

            <VStack spacing={4} mb={6} w='100%'>
              <LabeledTogglebleTextField
                label='Name'
                name='name'
                placeholder={defaultValues?.name}
              />
              <LabeledTogglebleTextField
                label='Email'
                name='email'
                placeholder={defaultValues?.email}
              />
              <LabeledTogglebleTextField label='Password' name='password' placeholder='*******' />
            </VStack>
            <VStack spacing={4} w='100%'>
              <Button
                onClick={() => {
                  setIsOpenUpdate(true)
                }}
                disabled={
                  (!values.name &&
                    !values.email &&
                    !values.password &&
                    profilePicture == defaultValues?.profilePicture) ||
                  submitting
                }
                colorScheme='teal'
                w={{ base: '90%', lg: '60%' }}
              >
                Confirm changes
              </Button>
              <Button
                colorScheme='red'
                w={{ base: '90%', lg: '60%' }}
                onClick={() => {
                  setIsOpenDelete(true)
                }}
              >
                Delete Account
              </Button>
            </VStack>
            <SimpleAlertDialog
              header='Update Account'
              body='In order to confirm the change you to provide in your current password'
              isOpen={isOpenUpdate}
              leastDestructiveRef={cancelRef}
              onClose={onCloseUpdate}
            >
              <VStack spacing={4}>
                <LabeledTextField label='Current Password' name='currentPassword' type='password' />
                <HStack spacing={4}>
                  <Button ref={cancelRef} onClick={onCloseUpdate}>
                    Cancel
                  </Button>
                  <Button
                    onClick={async () => {
                      form.submit()
                    }}
                    colorScheme='teal'
                  >
                    Submit
                  </Button>
                </HStack>
              </VStack>
            </SimpleAlertDialog>
            <SimpleAlertDialog
              header=''
              body='The changes were applied successfuly'
              isOpen={isOpenResultInformer.status}
              leastDestructiveRef={cancelRef}
              onClose={onCloseResultInformer}
            >
              <Button
                colorscheme='teal'
                onClick={async () => {
                  if (isOpenResultInformer.reload) {
                    setIsOpenResultInformer({ status: false, reload: false })
                    router.reload()
                  } else {
                    setIsOpenResultInformer({ status: false, reload: false })
                    await logoutMutation()
                  }
                }}
              >
                OK
              </Button>
            </SimpleAlertDialog>
            <SimpleAlertDialog
              header='Delete Account'
              body='Are you sure? You cannot undo this action afterwards.'
              isOpen={isOpenDelete}
              leastDestructiveRef={cancelRef}
              onClose={onCloseDelete}
            >
              <Button ref={cancelRef} onClick={onCloseDelete}>
                Cancel
              </Button>
              <Button
                colorScheme='red'
                onClick={async () => {
                  try {
                    await deleteAccMutation()
                    await logoutMutation()
                    await router.push(Routes.Home())
                  } catch (error: any) {
                    alert(
                      'Your account has active memberships and could not be deleted. If you wish to delete your account, make sure to cancel all  your memberships beforehand'
                    )
                    onCloseDelete()
                  }
                }}
              >
                Delete
              </Button>
            </SimpleAlertDialog>
          </form>
        )}
      />
    </Flex>
  )
}
