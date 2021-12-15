import React, { useState } from 'react'
import { useMutation } from 'blitz'
import {
  Flex,
  Img,
  Text,
  HStack,
  Button,
  Divider,
  Spacer,
  InputGroup,
  Input,
  InputRightElement
} from '@chakra-ui/react'
import createPostComment from '../mutations/createPostComment'

type PostCommentsProps = {
  postId: number
  updateComments: (newComments: CommentProps[]) => void
  comments: CommentProps[]
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
export const PostComments = ({ postId, updateComments, comments }: PostCommentsProps) => {
  const [commentContent, setcommentContent] = useState('')
  const [createComment] = useMutation(createPostComment)
  const submitComment = async () => {
    try {
      const newComment = await createComment({ postId, content: commentContent })
      updateComments([newComment, ...comments])
      setcommentContent('')
    } catch (e) {
      console.error('Error: ' + e)
    }
  }
  return (
    <Flex direction='column' maxW='30%' height='calc(100%)'>
      <Flex direction='column' height='calc(100%-1.75rem)' overflowY='scroll'>
        {comments.map((comment) => (
          <Comment key={comment.id} {...comment} />
        ))}
      </Flex>

      <InputGroup mt='1rem' mb='0.5rem' size='md'>
        <Input
          value={commentContent}
          onChange={(e) => setcommentContent(e.target.value)}
          pr='4.5rem'
          type='text'
          placeholder='Add a comment...'
        />
        <InputRightElement width='4.5rem'>
          <Button
            h='1.75rem'
            size='sm'
            onClick={submitComment}
            disabled={commentContent.length == 0}
          >
            Post
          </Button>
        </InputRightElement>
      </InputGroup>
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
      {areRepliesOpen && props.replies.map((reply) => <Reply key={reply.id} {...reply} />)}
    </Flex>
  )
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
