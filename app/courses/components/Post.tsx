import React, { useState } from 'react'
import { Routes, useQuery } from 'blitz'
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
  ModalContent,
  Divider
} from '@chakra-ui/react'
import { useBreakpointValue } from '@chakra-ui/react'
import { CalendarIcon } from '@chakra-ui/icons'
import { AiFillFilePdf } from 'react-icons/ai'
import { BiMessageRoundedDetail } from 'react-icons/bi'
import { StyledLink } from 'app/core/components/StyledLink'
import { PostComments } from 'app/courses/components/PostComments'
import getPostComments from '../queries/getPostComments'

interface PostProps {
  id: number
  title: string
  createdAt: Date
  updatedAt: Date
  description: string
  files: { name: string; url: string }[]
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

  const [comments, { refetch: refetchPostComments }] = useQuery(getPostComments, props.id, {
    suspense: false,
    initialData: props.comments,
    refetchInterval: 3000
  })

  const dividerOrientation = useBreakpointValue<'horizontal' | 'vertical'>({
    base: 'horizontal',
    xl: 'vertical'
  })

  console.log('comments', props.id)
  return (
    <>
      {comments && (
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
                  <Heading size='sm'>{`${props.author.name} - ${props.courseTitle}`}</Heading>
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
                <Heading size='sm'>{props.createdAt.toUTCString()}</Heading>
              </Stack>
            </Flex>
            <Heading size='md' mb={4}>
              {props.title}
            </Heading>
            <Text>{props.description}</Text>
            <Stack direction={{ base: 'column', md: 'row' }} spacing={4} mt={4}>
              {props.files.map((file) => (
                <Button key={file.name} leftIcon={<AiFillFilePdf />}>
                  <StyledLink href={file.url} rel='noopener noreferrer' target='_blank'>
                    {file.name}
                  </StyledLink>
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
            <ModalContent maxW='80%' h='80%'>
              <ModalHeader>{props.title}</ModalHeader>
              <ModalCloseButton />
              <ModalBody maxH='100%' display='flex'>
                <Flex direction={{ base: 'column', xl: 'row' }} w='100%' maxH='100%'>
                  <Flex direction='column' mb={4} w={{ base: '100%', xl: '70%' }}>
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
                        <Button key={file.name} leftIcon={<AiFillFilePdf />}>
                          <StyledLink href={file.url} rel='noopener noreferrer' target='_blank'>
                            {file.name}
                          </StyledLink>
                        </Button>
                      ))}
                    </Stack>
                  </Flex>
                  <Divider
                    orientation={dividerOrientation}
                    mx={{ base: '0', xl: '4' }}
                    my={{ base: '4', xl: '0' }}
                  />
                  <Flex direction='column' w={{ base: '100%', xl: '30%' }} h='100%'>
                    <PostComments
                      postId={props.id}
                      updateComments={() => refetchPostComments()}
                      comments={comments}
                    />
                  </Flex>
                </Flex>
              </ModalBody>
            </ModalContent>
          </Modal>
        </VStack>
      )}
    </>
  )
}

export default Post
