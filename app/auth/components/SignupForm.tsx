import { useState } from 'react'
import { useMutation } from 'blitz'
import { LabeledTextField } from 'app/core/components/LabeledTextField'
import { Form, FORM_ERROR } from 'app/core/components/Form'
import signup from 'app/auth/mutations/signup'
import { Signup } from 'app/auth/validations'
import {
  Flex,
  Box,
  Center,
  Stack,
  HStack,
  VStack,
  Image,
  Heading,
  InputGroup,
  InputLeftElement,
  Icon,
  Input,
  Button,
  Radio,
  RadioGroup
} from '@chakra-ui/react'
import { BsFillPersonFill } from 'react-icons/bs'
import { AiOutlineMail } from 'react-icons/ai'
import { RiLockPasswordFill } from 'react-icons/ri'

type SignupFormProps = {
  onSuccess?: () => void
}

export const SignupForm = (props: SignupFormProps) => {
  const [signupMutation] = useMutation(signup)
  const [value, setValue] = useState('student')
  return (
    <Box
      borderWidth="2px"
      borderColor="teal.400"
      width={{ base: '90%', md: '80%', lg: '40%' }}
      rounded={6}
      mt={{ base: '100px', lg: '0px' }}
      mb={{ base: '50px', lg: '0px' }}
    >
      <Flex alignItems="center" justifyContent="center" direction="column">
        <HStack spacing={6} p={10}>
          <Image src="/images/signup.png" alt="signup" maxWidth="100px" />
          <Heading>Sign Up</Heading>
        </HStack>
        <Form
          submitText="Create Account"
          schema={Signup}
          initialValues={{ name: '', email: '', password: '' }}
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
              <LabeledTextField name="name" label="Name" placeholder="Full Name" type="text" />
              <LabeledTextField name="email" label="Email" placeholder="Email" />
              <LabeledTextField
                name="password"
                label="Password"
                placeholder="Password"
                type="password"
              />
              {/* <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Icon as={BsFillPersonFill} color="teal.400" />
                </InputLeftElement>
                <Input
                  name="name"
                  type="text"
                  placeholder="Full Name"
                  focusBorderColor="teal.400"
                />
              </InputGroup>
            </HStack>
            <HStack spacing={4}>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Icon as={AiOutlineMail} color="teal.400" />
                </InputLeftElement>
                <Input name="email" type="email" placeholder="Email" focusBorderColor="teal.400" />
              </InputGroup>
            </HStack>
            <HStack spacing={4}>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Icon as={RiLockPasswordFill} color="teal.400" />
                </InputLeftElement>
                <Input
                  name="password"
                  type="password"
                  placeholder="Password"
                  focusBorderColor="teal.400"
                />
              </InputGroup>
            </HStack>*/}
            </VStack>
          </VStack>
          <Center>
            <RadioGroup value={value} p={10}>
              <Stack direction="row">
                <Radio value="student" colorScheme="teal">
                  Student
                </Radio>
                <Radio value="tutor" colorScheme="teal">
                  Tutor
                </Radio>
              </Stack>
            </RadioGroup>
          </Center>
          <Center>
            <HStack spacing={4} p={6}>
              <Button variant="outline">Cancel</Button>
              <Button type="submit" colorScheme="teal">
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
