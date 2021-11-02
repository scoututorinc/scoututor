import React from 'react'
import { useMutation } from 'blitz'
import { LabeledTextField } from 'app/core/components/LabeledTextField'
import { Form, FORM_ERROR } from 'app/core/components/Form'
import signup from 'app/auth/mutations/signup'
import { Signup } from 'app/auth/validations'
import {
  Flex,
  Box,
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
  const [value, setValue] = React.useState('student')
  return (
    <Box borderWidth="2px" borderColor="teal.400" width="30%" rounded={6}>
      {/* <h1>Create an Account</h1>

      <Form
        submitText="Create Account"
        schema={Signup}
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values) => {
          try {
            await signupMutation(values)
            props.onSuccess?.()
          } catch (error: any) {
            if (error.code === "P2002" && error.meta?.target?.includes("email")) {
              // This error comes from Prisma
              return { email: "This email is already being used" }
            } else {
              return { [FORM_ERROR]: error.toString() }
            }
          }
        }}
      >
        <LabeledTextField name="email" label="Email" placeholder="Email" />
        <LabeledTextField name="password" label="Password" placeholder="Password" type="password" />
      </Form> */}
      <Flex alignItems="center" justifyContent="center" direction="column">
        <HStack spacing={6} p={10}>
          <Image src="/images/signup.png" alt="signup" maxWidth="100px" />
          <Heading>Sign Up</Heading>
        </HStack>
        <Form
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
            <HStack spacing={4}>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Icon as={BsFillPersonFill} color="teal.400" />
                </InputLeftElement>
                <Input type="text" placeholder="Full Name" focusBorderColor="teal.400" />
              </InputGroup>
            </HStack>
            <HStack spacing={4}>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Icon as={AiOutlineMail} color="teal.400" />
                </InputLeftElement>
                <Input type="email" placeholder="Email" focusBorderColor="teal.400"></Input>
              </InputGroup>
            </HStack>
            <HStack spacing={4}>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Icon as={RiLockPasswordFill} color="teal.400" />
                </InputLeftElement>
                <Input type="password" placeholder="Password" focusBorderColor="teal.400"></Input>
              </InputGroup>
            </HStack>
          </VStack>
          <RadioGroup value={value} p={8}>
            <Stack direction="row">
              <Radio value="student" colorScheme="teal">
                Student
              </Radio>
              <Radio value="tutor" colorScheme="teal">
                Tutor
              </Radio>
            </Stack>
          </RadioGroup>
          <HStack spacing={4} p={6}>
            <Button variant="outline">Cancel</Button>
            <Button type="submit" colorScheme="teal">
              Confirm
            </Button>
          </HStack>
        </Form>
      </Flex>
    </Box>
  )
}

export default SignupForm
