import { Routes } from 'blitz'
import {
  Flex,
  Box,
  VStack,
  Stack,
  Button,
  Img,
  Spacer,
  Heading,
  Text,
  Icon
} from '@chakra-ui/react'
import { CalendarIcon } from '@chakra-ui/icons'
import { AiFillFilePdf } from 'react-icons/ai'
import { BiMessageRoundedDetail } from 'react-icons/bi'
import React from 'react'
import { StyledLink } from 'app/core/components/StyledLink'

interface PostProps {
  id: number
  title: string
  createdAt: Date
  updatedAt: Date
  author: {
    id: number
    name: string
    profilePicture: string | null
  }
  description: string
  files: string[]
  courseId: number
  courseTitle: string
}

const Post = (props: PostProps) => {
  return (
    <VStack spacing={4} mt={4}>
      <Box borderWidth='1px' rounded={6} p={4} width='100%'>
        <Flex direction={{ base: 'column', md: 'row' }} mb={4}>
          {/* //TODO: Link to post page */}
          <StyledLink href={Routes.MainFeed()}>
            <Stack direction={{ base: 'column', md: 'row' }} spacing={4} alignItems='center'>
              <Img
                src={props.author.profilePicture || '/images/profile.png'}
                alt='tutor'
                borderRadius='full'
                maxWidth='60px'
              />
              <Heading size='sm'>
                {props.author.name} - {props.courseTitle}
              </Heading>
            </Stack>
          </StyledLink>
          <Spacer />
          <Stack
            direction={{ base: 'column', md: 'row' }}
            alignItems='center'
            spacing={4}
            pt={{ base: 4, md: 0 }}
          >
            <CalendarIcon />
            <Heading size='sm'>{props.createdAt.toLocaleString()}</Heading>
          </Stack>
        </Flex>
        <Text>{props.description}</Text>
        <Stack direction={{ base: 'column', md: 'row' }} spacing={4} mt={4}>
          {props.files.map((file) => (
            <Button key={file} leftIcon={<AiFillFilePdf />}>
              {file}
            </Button>
          ))}
        </Stack>
        <Flex mt={4} justifyContent='center'>
          <Button leftIcon={<Icon as={BiMessageRoundedDetail} />} variant='ghost'>
            Comment
          </Button>
        </Flex>
      </Box>
    </VStack>
  )
}

export default Post
