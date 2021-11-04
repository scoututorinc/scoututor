import { FC } from 'react'
import {
  Flex,
  Box,
  VStack,
  Stack,
  Button,
  Image,
  Spacer,
  Heading,
  Text,
  Icon
} from '@chakra-ui/react'
import { CalendarIcon } from '@chakra-ui/icons'
import { AiFillFilePdf } from 'react-icons/ai'
import { BiMessageRoundedDetail } from 'react-icons/bi'

const Post: FC = () => {
  const post = {
    author: 'Angelique Kerber',
    course: 'Mathematics',
    date: 'Friday, 29th October 2021',
    text:
      'As you know exams are approaching and you should raise up the pace of your studying.' +
      'Having that into account I would like to schedule another session for the following week.' +
      'In order to make the session productive I would like you to go through the assignments' +
      'that you can find in the post. As always, if you have any doubt during the week feel free' +
      'to reach me through the direct messages. Keep up the good work!',
    material: ['assignment_1.pdf', 'assignment_2.pdf', 'assignment_3.pdf']
  }

  return (
    <VStack spacing={4} mt={4}>
      <Box borderWidth="1px" rounded={6} p={4} width="100%">
        <Flex direction={{ base: 'column', md: 'row' }} mb={4}>
          <Stack direction={{ base: 'column', md: 'row' }} spacing={4} alignItems="center">
            <Image src="/images/knowledge.png" alt="tutor" borderRadius="full" maxWidth="60px" />
            <Heading size="sm">
              {post.author} - {post.course}
            </Heading>
          </Stack>
          <Spacer />
          <Stack
            direction={{ base: 'column', md: 'row' }}
            alignItems="center"
            spacing={4}
            pt={{ base: 4, md: 0 }}
          >
            <CalendarIcon />
            <Heading size="sm">{post.date}</Heading>
          </Stack>
        </Flex>
        <Text>{post.text}</Text>
        <Stack direction={{ base: 'column', md: 'row' }} spacing={4} mt={4}>
          {post.material.map((item) => (
            <Button key={item} leftIcon={<AiFillFilePdf />}>
              {item}
            </Button>
          ))}
        </Stack>
        <Flex mt={4} justifyContent="center">
          <Button leftIcon={<Icon as={BiMessageRoundedDetail} />} variant="ghost">
            Comment
          </Button>
        </Flex>
      </Box>
    </VStack>
  )
}

export default Post
