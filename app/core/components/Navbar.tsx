import { Link as BlitzLink, Routes } from 'blitz'
import { FC } from 'react'
import { Box, Flex, Img, HStack, Input, Button, Link } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import { StyledLink } from 'app/core/components/StyledLink'

const Navbar: FC = () => {
  return (
    <Box borderWidth={{ base: 'none', lg: '1px' }} mb='50px'>
      <Flex
        height='10vh'
        alignItems='center'
        justifyContent='space-between'
        direction={{ base: 'column', lg: 'row' }}
        pl={10}
        pr={10}
      >
        <StyledLink href={Routes.Home().pathname}>
          <Img
            src='images/scoututor.png'
            alt='scoututor'
            maxHeight='80%'
            maxWidth='20vh'
            margin={{ base: '10px', lg: '0px' }}
          />
        </StyledLink>

        {/* TODO: If on mobile display we may not want to render this at all */}
        <HStack spacing={4} width={{ base: '90%', md: '40%' }} margin={{ base: '10px', lg: '0px' }}>
          <Input
            focusBorderColor='teal.400'
            type='text'
            placeholder='What do you need help with?'
          />
          <Button colorScheme='teal'>
            <SearchIcon />
          </Button>
        </HStack>
        <HStack spacing={6} margin={{ base: '10px', lg: '0px' }}>
          <Link as={BlitzLink} href={Routes.LoginPage().pathname}>
            <Button variant='outline'>Log In</Button>
          </Link>
          <Link as={BlitzLink} href={Routes.SignupPage().pathname}>
            <Button colorScheme='teal'>Sign Up</Button>
          </Link>
        </HStack>
      </Flex>
    </Box>
  )
}

export default Navbar
