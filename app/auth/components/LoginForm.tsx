import { AuthenticationError, useMutation } from 'blitz'
import { LabeledTextField } from 'app/core/components/forms/LabeledTextField'
import { Form, FORM_ERROR } from 'app/core/components/forms/Form'
import login from 'app/auth/mutations/login'
import { Login } from 'app/auth/validations'
import {
  Box,
  Flex,
  HStack,
  VStack,
  Img,
  Heading,
  Button,
  Link as ChakraLink,
  Checkbox
} from '@chakra-ui/react'
import { AiOutlineMail } from 'react-icons/ai'
import { RiLockPasswordFill } from 'react-icons/ri'

type LoginFormProps = {
  onSuccess?: () => void
}

export const LoginForm = (props: LoginFormProps) => {
  const [loginMutation] = useMutation(login)

  return (
    <Box
      borderWidth='2px'
      borderColor='teal.400'
      width={{ base: '90%', md: '80%', lg: '40%' }}
      rounded={6}
      mt={{ base: '150px', lg: '0px' }}
      mx='auto'
    >
      <Flex alignItems='center' justifyContent='center' direction='column'>
        <HStack spacing={6} p={10}>
          <Img src='/images/signup.png' alt='login' maxWidth='100px' />
          <Heading>Log In</Heading>
        </HStack>
        <Form
          schema={Login}
          initialValues={{ email: '', password: '' }}
          onSubmit={async (values) => {
            try {
              await loginMutation(values)
              props.onSuccess?.()
            } catch (error: any) {
              if (error instanceof AuthenticationError) {
                return { [FORM_ERROR]: 'Sorry, those credentials are invalid' }
              } else {
                return {
                  [FORM_ERROR]:
                    'Sorry, we had an unexpected error. Please try again. - ' + error.toString()
                }
              }
            }
          }}
        >
          <VStack spacing={6} p={10}>
            <VStack spacing={4}>
              <LabeledTextField
                name='email'
                type='email'
                label='Email'
                placeholder='Email'
                icon={AiOutlineMail}
              />
              <LabeledTextField
                name='password'
                label='Password'
                placeholder='Password'
                type='password'
                icon={RiLockPasswordFill}
              />
            </VStack>
            <Checkbox colorScheme='teal' defaultChecked>
              Remember me
            </Checkbox>
            <ChakraLink color='teal.400' href=''>
              Forgot your password?
            </ChakraLink>
            <Button type='submit' colorScheme='teal'>
              Log In
            </Button>
          </VStack>
        </Form>
      </Flex>
    </Box>
  )
}

export default LoginForm
