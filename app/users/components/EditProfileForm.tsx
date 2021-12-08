import React, { useState, useRef } from 'react'
import { z } from 'zod'
import { validateZodSchema, useMutation, useRouter, Routes } from 'blitz'

import { UpdateProfileFormPlaceholders, UpdateProfile } from 'app/auth/validations'
import { Form as FinalForm } from 'react-final-form'
import { Flex, Box, HStack, VStack, Button } from '@chakra-ui/react'
import { LabeledTextField } from 'app/core/components/forms/LabeledTextField'
import { LabeledTogglebleTextField } from 'app/core/components/forms/LabeledTogglebleTextField'
import { SimpleAlertDialog } from 'app/core/components/SimpleAlertDialog'
import updateProfile from 'app/auth/mutations/updateProfile'
import deleteAccount from 'app/auth/mutations/deleteAccount'
import logout from 'app/auth/mutations/logout'
import { valueScaleCorrection } from 'framer-motion/types/render/dom/layout/scale-correction'

type EditProfileFormProps = {
  onSuccess?: () => void
  defaultValues?: z.infer<typeof UpdateProfileFormPlaceholders>
}

export const EditProfileForm = ({ defaultValues, onSuccess }: EditProfileFormProps) => {
  const router = useRouter()
  const [isOpenUpdate, setIsOpenUpdate] = useState({ status: false, data: {} })
  const onCloseUpdate = () => setIsOpenUpdate({ status: false, data: {} })
  const [isOpenDelete, setIsOpenDelete] = useState(false)
  const onCloseDelete = () => setIsOpenDelete(false)
  const cancelRef = useRef(null)

  const [updateProfileMutation] = useMutation(updateProfile)
  const [deleteAccMutation] = useMutation(deleteAccount)
  const [logoutMutation] = useMutation(logout)

  return (
    <Flex direction='column' w={{ base: '90%', lg: '30%' }}>
      <FinalForm
        validate={validateZodSchema(UpdateProfile)}
        initialValues={{
          name: null,
          email: null,
          password: null,
          currentPassword: undefined
        }}
        onSubmit={async (values) => {
          console.log('Tried to update profile')
          console.log(values)
          setIsOpenUpdate({ status: true, data: { ...values } })
        }}
        //debug={console.log}
        render={({ handleSubmit, submitting, values }) => (
          <Box as='form' w='100%' onSubmit={handleSubmit}>
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
                type='submit'
                disabled={!values.name && !values.email && !values.password}
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
              isOpen={isOpenUpdate.status}
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
                      const updateProfileFormInfo = { ...values }
                      await updateProfileMutation(updateProfileFormInfo)
                      setIsOpenUpdate({ status: false, data: {} })
                      router.push(Routes.Profile())
                    }}
                    disabled={submitting}
                    colorScheme='teal'
                  >
                    Submit
                  </Button>
                </HStack>
              </VStack>
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
          </Box>
        )}
      />
    </Flex>
  )
}