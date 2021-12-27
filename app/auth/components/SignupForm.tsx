import { Routes, useMutation } from 'blitz'
import React, { useState } from 'react'
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
  Container
} from '@chakra-ui/react'
import { Select } from 'chakra-react-select'
import { BsFillPersonFill } from 'react-icons/bs'
import { AiOutlineMail } from 'react-icons/ai'
import { RiLockPasswordFill } from 'react-icons/ri'

import signup from 'app/auth/mutations/signup'
import { Signup } from 'app/auth/validations'

import { LabeledTextField } from 'app/core/components/forms/LabeledTextField'
import { StyledLink } from 'app/core/components/StyledLink'
import { portugal } from 'app/auth/data/portugal'
import { string } from 'zod'

type SignupFormProps = {
  onSuccess?: () => void
}

export const SignupForm = (props: SignupFormProps) => {
  const [signupMutation] = useMutation(signup)
  const [selectableConselhos, setSelectableConselhos] = useState(
    [] as Array<Record<string, string>> | undefined
  )

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
            email: '',
            password: '',
            district: '',
            municipality: ''
          }}
          onSubmit={async (values) => {
            try {
              await signupMutation(values)
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
                  <FormLabel>
                    <strong>District</strong>
                  </FormLabel>
                  <Select
                    mb={2}
                    selectedOptionStyle='check'
                    placeholder='Select ...'
                    name='district'
                    onChange={(event) => {
                      const chosen_district = portugal.find(
                        (element) => element.name == event.value
                      )
                      const selectableConselhos_ = chosen_district?.conselhos.map((conselho) => {
                        return {
                          label: conselho.name,
                          value: conselho.name
                        }
                      })
                      setSelectableConselhos(selectableConselhos_)
                    }}
                    options={portugal.map((district) => {
                      return { label: district.name, value: district.name }
                    })}
                  />
                  <FormLabel mt={2}>
                    <strong>Municipality</strong>
                  </FormLabel>
                  <Select
                    isDisabled={selectableConselhos?.length == 0}
                    name='municipality'
                    selectedOptionStyle='check'
                    placeholder='Select ...'
                    options={selectableConselhos}
                  />
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
              <StyledLink href={Routes.Home().pathname}>
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
