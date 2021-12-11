import React, { useState } from 'react'
import { Flex, Img, Text, HStack, Button, Divider, Spacer } from '@chakra-ui/react'

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
}

type PostCommentsProps = {
  comments: CommentProps[]
}
const Reply = (props) => {
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
        {!areRepliesOpen && props.replies.length > 0 && (
          <Button onClick={() => setRepliesOpen(true)} fontSize='xs' variant='ghost'>
            View replies
          </Button>
        )}
        {areRepliesOpen && (
          <Button onClick={() => setRepliesOpen(false)} fontSize='xs' variant='ghost'>
            Close replies
          </Button>
        )}
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
