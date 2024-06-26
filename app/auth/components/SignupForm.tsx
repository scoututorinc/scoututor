import { Routes, useMutation } from 'blitz'
import React, { useEffect, useState } from 'react'
import { Form, FORM_ERROR } from 'app/core/components/forms/Form'
import {
  Flex,
  Box,
  Center,
  HStack,
  VStack,
  Img,
  Heading,
  Button,
  FormLabel,
  Container,
  FormControl,
  Spacer
} from '@chakra-ui/react'
import { BsFillPersonFill } from 'react-icons/bs'
import { AiOutlineMail } from 'react-icons/ai'
import { RiLockPasswordFill } from 'react-icons/ri'
import { PickerOverlay } from 'filestack-react'

import signup from 'app/auth/mutations/signup'
import { Signup } from 'app/auth/validations'

import { LabeledTextField } from 'app/core/components/forms/LabeledTextField'
import { StyledLink } from 'app/core/components/StyledLink'
import { portugal } from 'app/auth/data/portugal'
import { SelectField } from 'app/core/components/forms/SelectField'

type SignupFormProps = {
  onSuccess?: () => void
}

export const SignupForm = (props: SignupFormProps) => {
  const [signupMutation] = useMutation(signup)
  const [selectableConselhos, setSelectableConselhos] = useState([] as Array<any> | undefined)

  const [isUploading, setIsUploading] = useState(false)
  const [profilePicture, setProfilePicture] = useState(null)

  return (
    <Box
      borderWidth='2px'
      borderColor='teal.400'
      width={{ base: '90%', md: '80%', lg: '40%' }}
      rounded={6}
      mt={{ base: '100px', lg: '0px' }}
      mb={{ base: '50px', lg: '0px' }}
    >
      <Flex alignItems='center' justifyContent='center' direction='column'>
        <HStack spacing={6} p={10}>
          <Img src='/images/signup.png' alt='signup' maxWidth='100px' />
          <Heading>Sign Up</Heading>
        </HStack>
        <Form
          schema={Signup}
          initialValues={{
            first_name: '',
            last_name: '',
            profilePicture: null,
            email: '',
            password: '',
            district: '',
            municipality: ''
          }}
          onSubmit={async (values) => {
            try {
              console.log(values)
              await signupMutation({ ...values, profilePicture })
              props.onSuccess?.()
            } catch (error: any) {
              if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
                // This error comes from Prisma
                return { email: 'This email is already being used' }
              } else {
                return { [FORM_ERROR]: error.toString() }
              }
            }
          }}
        >
          <VStack spacing={6} p={10}>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel fontWeight='bold'>Profile Picture</FormLabel>
                <HStack>
                  <Img
                    src={profilePicture || '/images/sidebar/profile.png'}
                    width='50px'
                    height='50px'
                    objectFit={'cover'}
                  />
                  <Spacer />
                  <Button onClick={() => setIsUploading(true)}>Upload</Button>
                </HStack>
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
              </FormControl>
              <LabeledTextField
                name='first_name'
                label='First Name'
                placeholder='First Name'
                type='text'
                icon={BsFillPersonFill}
              />
              <LabeledTextField
                name='last_name'
                label='Last Name'
                placeholder='Last Name'
                type='text'
                icon={BsFillPersonFill}
              />
              <LabeledTextField
                name='email'
                label='Email'
                placeholder='Email'
                icon={AiOutlineMail}
              />
              <VStack w='100%' spacing={2} alignItems='start'>
                <Container w='100%' m={0} p={0}>
                  <Heading size='sm' mb={2}>
                    Location
                  </Heading>
                  <SelectField
                    mb={2}
                    label='District'
                    placeholder='Select ...'
                    name='district'
                    onChange={(event) => {
                      const chosen_district = portugal.find(
                        (element) => element.name == event.target.value
                      )
                      const selectableConselhos_ = chosen_district?.conselhos.map((conselho) => {
                        return (
                          <option key={conselho.name} value={conselho.name}>
                            {conselho.name}
                          </option>
                        )
                      })
                      setSelectableConselhos(selectableConselhos_)
                    }}
                  >
                    {portugal.map((district) => (
                      <option key={district.name} value={district.name}>
                        {district.name}
                      </option>
                    ))}
                  </SelectField>
                  <SelectField
                    label='Municipality'
                    name='municipality'
                    placeholder='Select ...'
                    options={selectableConselhos}
                  >
                    {selectableConselhos}
                  </SelectField>
                </Container>
              </VStack>

              <LabeledTextField
                name='password'
                label='Password'
                placeholder='Password'
                type='password'
                icon={RiLockPasswordFill}
              />
            </VStack>
          </VStack>
          <Center>
            <HStack spacing={4} p={6}>
              <StyledLink href={Routes.Home()}>
                <Button variant='outline'>Cancel</Button>
              </StyledLink>
              <Button type='submit' colorScheme='teal'>
                Confirm
              </Button>
            </HStack>
          </Center>
        </Form>
      </Flex>
    </Box>
  )
}

export default SignupForm
