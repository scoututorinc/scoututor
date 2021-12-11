import React, { useState } from 'react'
import { Flex, Img, Text, HStack, Button, Divider, Spacer } from '@chakra-ui/react'

type ReplyProps = {
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
}

type CommentProps = {
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
  replies: ReplyProps[]
}

type PostCommentsProps = {
  comments: CommentProps[]
}
const Reply = (props: ReplyProps) => {
  return (
    <Flex opacity='70%' w='100%' direction='row'>
      <Spacer w='20%' />
      <Flex w='80%' direction='column'>
        <HStack spacing={4}>
          <Img
            src={props.author.profilePicture || '/images/profile.png'}
            maxW='50px'
            borderRadius='full'
          />
          <Text fontSize='xs'>
            <strong>{props.author.name}</strong> {props.content}
          </Text>
        </HStack>
        <HStack spacing={6}>
          <Text fontSize='xs'>47m</Text>
          <Button fontSize='xs' variant='ghost'>
            Reply
          </Button>
        </HStack>
      </Flex>
    </Flex>
  )
}
const Comment = (props: CommentProps) => {
  const [areRepliesOpen, setRepliesOpen] = useState(false)
  return (
    <Flex w='100%' direction='column'>
      <HStack spacing={4}>
        <Img
          src={props.author.profilePicture || '/images/profile.png'}
          maxW='50px'
          borderRadius='full'
        />
        <Text fontSize='xs'>
          <strong>{props.author.name}</strong> {props.content}
        </Text>
      </HStack>
      <HStack spacing={6}>
        <Text fontSize='xs'>47m</Text>
        <Button fontSize='xs' variant='ghost'>
          Reply
        </Button>
        <Button onClick={() => setRepliesOpen((isOpen) => !isOpen)} fontSize='xs' variant='ghost'>
          {areRepliesOpen ? 'Close replies' : 'View replies'}
        </Button>
      </HStack>
      <Divider mb={4} />
      {areRepliesOpen && props.replies.map((reply) => <Reply key={reply.content} {...reply} />)}
    </Flex>
  )
}

export const PostComments = ({ comments }: PostCommentsProps) => {
  return (
    <Flex direction='column' maxW='30%' overflowY='scroll'>
      {comments.map((comment) => (
        <Comment key={comment.content} {...comment} />
      ))}
    </Flex>
  )
}
