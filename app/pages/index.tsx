import { Link, BlitzPage, useMutation, Routes } from 'blitz'
import { useCurrentUser } from 'app/core/hooks/useCurrentUser'
import LoggedOutLayout from 'app/core/layouts/LoggedOutLayout'
import logout from 'app/auth/mutations/logout'
import {
  Flex,
  Box,
  Image,
  VStack,
  HStack,
  Heading,
  Text,
  Icon,
  Center,
  Button
} from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'
import { BsLightning } from 'react-icons/bs'
import { FaReact } from 'react-icons/fa'
/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <>
        <button
          className="button small"
          onClick={async () => {
            await logoutMutation()
          }}
        >
          Logout
        </button>
        <div>
          User id: <code>{currentUser.id}</code>
          <br />
          User role: <code>{currentUser.role}</code>
        </div>
      </>
    )
  } else {
    return (
      <>
        <Link href={Routes.SignupPage()}>
          <a className="button small">
            <strong>Sign Up</strong>
          </a>
        </Link>
        <Link href={Routes.LoginPage()}>
          <a className="button small">
            <strong>Login</strong>
          </a>
        </Link>
      </>
    )
  }
}

const Home: BlitzPage = () => {
  return (
    <Box>
      <Flex
        alignItems="center"
        justifyContent="space-around"
        direction={{ base: 'column', xl: 'row' }}
        pl="10%"
        pr="10%"
        pt={{ base: '100px', sm: '50px' }}
      >
        <Image
          src="images/knowledge.png"
          alt="knowledge"
          maxHeight="25%"
          maxWidth={{ sm: '40%', xl: '30%' }}
          mb={{ lg: '50px' }}
        />
        <VStack spacing={4} align="stretch" mt={{ base: '70px', lg: '0px' }}>
          <Heading pb={6}>Let`s build knowledge together</Heading>
          <HStack spacing={4}>
            <Search2Icon color="gray.700" />
            <Text fontSize="xl">Find a tutor that suits you</Text>
          </HStack>
          <HStack spacing={4}>
            <Icon as={BsLightning} color="gray.700" />
            <Text fontSize="xl">Learn at your pace</Text>
          </HStack>
          <HStack spacing={4}>
            <Icon as={FaReact} color="gray.700" />
            <Text fontSize="xl">Share your learning</Text>
          </HStack>
        </VStack>
      </Flex>
      <Center pt="50px" pb="40px">
        <HStack spacing={6}>
          <Button colorScheme="teal">Join us</Button>
          <Button variant="outline">Sign in</Button>
        </HStack>
      </Center>
    </Box>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <LoggedOutLayout title="Home">{page}</LoggedOutLayout>

export default Home
