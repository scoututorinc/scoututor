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
  Icon,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  ModalContent,
  Divider
} from '@chakra-ui/react'
import { CalendarIcon } from '@chakra-ui/icons'
import { AiFillFilePdf } from 'react-icons/ai'
import { BiMessageRoundedDetail } from 'react-icons/bi'
import React, { useState } from 'react'
import { StyledLink } from 'app/core/components/StyledLink'
import { PostComments } from 'app/courses/components/PostComments'

interface PostProps {
  id: number
  title: string
  createdAt: Date
  updatedAt: Date
  description: string
  files: string[]
  courseId: number
  courseTitle: string
  author: {
    id: number
    name: string
    profilePicture: string | null
  }
  comments: {
    id: number
    createdAt: Date
    content: string
    postId: number
    authorId: number
    author: {
      id: number
      name: string
      profilePicture: string | null
    }
    replies: {
      id: number
      createdAt: Date
      content: string
      commentId: number
      authorId: number
      author: {
        id: number
        name: string
        profilePicture: string | null
      }
    }[]
  }[]
}

const Post = (props: PostProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const { comments, ...post } = props
  return (
    <VStack spacing={4} mt={4}>
      <Box borderWidth='1px' rounded={6} p={4} width='100%'>
        <Flex direction={{ base: 'column', md: 'row' }} mb={4}>
          {/* //TODO: Link to post page */}
          <Button variant='ghost' onClick={() => setIsOpen(true)}>
            <Stack direction={{ base: 'column', md: 'row' }} spacing={4} alignItems='center'>
              <Img
                src={props.author.profilePicture || '/images/profile.png'}
                alt='tutor'
                borderRadius='full'
                height={'2.5rem'}
                maxWidth='60px'
              />
              <Heading size='sm'>
                {props.author.name} - {props.courseTitle}
              </Heading>
            </Stack>
          </Button>
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
          <Button
            leftIcon={<Icon as={BiMessageRoundedDetail} />}
            variant='ghost'
            onClick={() => setIsOpen(true)}
          >
            Comment
          </Button>
        </Flex>
      </Box>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} scrollBehavior='inside' size='xl'>
        <ModalOverlay />
        <ModalContent maxW='80%' maxH='80%'>
          <ModalHeader>{props.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody maxH='100%' display='flex'>
            <Flex direction='row' maxH='100%'>
              <Flex direction='column' mb={4} w='65%'>
                <Flex direction='row' mb={4}>
                  {/* //TODO: Link to post page */}
                  <Stack direction='row' spacing={4} alignItems='center'>
                    <Img
                      src={props.author.profilePicture || '/images/profile.png'}
                      alt='tutor'
                      borderRadius='full'
                      height={'2.5rem'}
                      maxWidth='60px'
                    />
                    <Heading size='sm'>
                      {props.author.name} - {props.courseTitle}
                    </Heading>
                  </Stack>
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
              </Flex>
              <Divider orientation='vertical' mx={4} />
              <PostComments comments={props.comments} />
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </VStack>
  )
}

export default Post
