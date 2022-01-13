import { Link as BlitzLink, BlitzPage, useMutation, Routes } from 'blitz'
import {
  Flex,
  Box,
  Img,
  VStack,
  HStack,
  Heading,
  Text,
  Icon,
  Center,
  Button,
  Link
} from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'
import { BsLightning } from 'react-icons/bs'
import { FaReact } from 'react-icons/fa'
import { AiFillGoogleCircle } from 'react-icons/ai'

import MixedLayout from 'app/core/layouts/MixedLayout'
import { useCurrentUser } from 'app/core/hooks/useCurrentUser'
import logout from 'app/auth/mutations/logout'
import { StyledLink } from 'app/core/components/StyledLink'

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <>
        <button
          className='button small'
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
        <Link as={BlitzLink} href={Routes.SignupPage().pathname}>
          <strong>Sign Up</strong>
        </Link>
        <Link as={BlitzLink} href={Routes.LoginPage().pathname}>
          <strong>Login</strong>
        </Link>
        <StyledLink href={'/api/auth/google'}>
          <Button>
            <Icon as={AiFillGoogleCircle} />
            <Text>Login with Google</Text>
          </Button>
        </StyledLink>
      </>
    )
  }
}

const Home: BlitzPage = () => {
  return (
    <Box>
      <Flex
        alignItems='center'
        justifyContent='space-around'
        direction={{ base: 'column', xl: 'row' }}
        pl='10%'
        pr='10%'
        pt={{ base: '100px', sm: '50px' }}
      >
        <Img
          src='/images/knowledge.png'
          alt='knowledge'
          maxHeight='25%'
          maxWidth={{ sm: '40%', xl: '30%' }}
          mb={{ lg: '50px' }}
        />
        <VStack spacing={4} align='stretch' mt={{ base: '70px', lg: '0px' }}>
          <Heading pb={6}>Let`s build knowledge together</Heading>
          <HStack spacing={4}>
            <Search2Icon color='gray.700' />
            <Text fontSize='xl'>Find a tutor that suits you</Text>
          </HStack>
          <HStack spacing={4}>
            <Icon as={BsLightning} color='gray.700' />
            <Text fontSize='xl'>Learn at your pace</Text>
          </HStack>
          <HStack spacing={4}>
            <Icon as={FaReact} color='gray.700' />
            <Text fontSize='xl'>Share your learning</Text>
          </HStack>
        </VStack>
      </Flex>
      <Center pt='50px' pb='40px'>
        <VStack spacing={4}>
          <HStack spacing={6}>
            <Link as={BlitzLink} href={Routes.SignupPage().pathname}>
              <Button colorScheme='teal'>Sign Up</Button>
            </Link>
            <Link as={BlitzLink} href={Routes.LoginPage().pathname}>
              <Button variant='outline'>Log In</Button>
            </Link>
          </HStack>
          <StyledLink href={'/api/auth/google'}>
            <Button>
              <HStack spacing={2}>
                <Icon as={AiFillGoogleCircle} />
                <Text>Authenticate with Google</Text>
              </HStack>
            </Button>
          </StyledLink>
        </VStack>
      </Center>
    </Box>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <MixedLayout title='Home'>{page}</MixedLayout>

export default Home
