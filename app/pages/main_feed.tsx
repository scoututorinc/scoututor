import { BlitzPage } from 'blitz'
import {
  Flex,
  Spacer,
  HStack,
  VStack,
  Stack,
  Button,
  Heading,
  Input,
  Divider
} from '@chakra-ui/react'
import Sidebar from '../core/components/Sidebar'
import { SearchIcon } from '@chakra-ui/icons'
import Post from '../core/components/Post'
import LoggedInLayout from 'app/core/layouts/LoggedInLayout'

const MainFeed: BlitzPage = () => {
  const currently_enrolled_courses = ['Mathematics', 'Geography', 'Graphic Design']

  return (
    <Flex direction="column" w="100%" p={10}>
      <Flex direction={{ base: 'column', md: 'row' }} justifyContent="space-between">
        <VStack spacing={2}>
          <Heading>This is what is happening</Heading>
          <Divider />
        </VStack>
        <Spacer />
        <HStack width={{ base: '100%', md: '30%' }} spacing={4}>
          <Input focusBorderColor="teal.400" type="text" placeholder="What are you looking for?" />
          <Button colorScheme="teal">
            <SearchIcon colorScheme="gray.700" />
          </Button>
        </HStack>
      </Flex>
      <Flex direction="column" mt={14}>
        <Flex>
          <VStack spacing={2}>
            <Heading size="lg">Currently enrolled courses</Heading>
            <Divider mt={4} />
          </VStack>
          <Spacer />
        </Flex>
        <Stack direction={{ base: 'column', sm: 'row' }} spacing={4} mt={4}>
          {currently_enrolled_courses.map((course) => (
            <Button key={course} colorScheme="teal">
              {course}
            </Button>
          ))}
        </Stack>
      </Flex>
      <Flex direction="column" mt={14}>
        <Flex>
          <VStack spacing={2}>
            <Heading size="lg">Latest posts</Heading>
            <Divider mt={4} />
          </VStack>
          <Spacer />
        </Flex>
      </Flex>
      <Divider />
      <Post />
      <Post />
      <Post />
    </Flex>
  )
}

// MainFeed.authenticate = { redirectTo: '/login' }
MainFeed.getLayout = (page) => <LoggedInLayout title="Main Feed">{page}</LoggedInLayout>
export default MainFeed
