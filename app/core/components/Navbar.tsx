import type { BlitzPage } from 'blitz'
import { FC } from 'react'
import { Box, Flex, Image, HStack, Input, Button } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'

const Navbar: FC = () => {
  return (
    <Box borderWidth={{ base: 'none', lg: '1px' }} mb="50px">
      <Flex
        height="10vh"
        alignItems="center"
        justifyContent="space-between"
        direction={{ base: 'column', lg: 'row' }}
        pl={10}
        pr={10}
      >
        <Image
          src="images/scoututor.png"
          alt="scoututor"
          maxHeight="80%"
          maxWidth="20vh"
          margin={{ base: '10px', lg: '0px' }}
        />
        {/* TODO: If on mobile display we may not want to render this at all */}
        <HStack spacing={4} width={{ base: '90%', md: '40%' }} margin={{ base: '10px', lg: '0px' }}>
          <Input
            focusBorderColor="teal.400"
            type="text"
            placeholder="What do you need help with?"
          />
          <Button colorScheme="teal">
            <SearchIcon color="gray.700" />
          </Button>
        </HStack>
        <HStack spacing={6} margin={{ base: '10px', lg: '0px' }}>
          <Button variant="outline">For universities</Button>
          <Button colorScheme="teal">Join us</Button>
        </HStack>
      </Flex>
    </Box>
  )
}

export default Navbar
