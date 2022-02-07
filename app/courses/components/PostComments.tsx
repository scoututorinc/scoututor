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
  InputRightElement,
  InputLeftAddon,
  CloseButton
} from '@chakra-ui/react'

import createPostComment from '../mutations/createPostComment'
import createPostCommentReply from '../mutations/createPostCommentReply'

type PostCommentsProps = {
  postId: number
  updateComments: () => void
  comments: Omit<CommentProps, 'setReplying'>[]
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
  setReplying: (user: { commentId: number; name: string }) => void
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
  const [replyingTo, setreplyingTo] = useState<{ commentId: number; name: string } | null>(null)

  const [createComment] = useMutation(createPostComment)
  const [createCommentReply] = useMutation(createPostCommentReply)
  const submitComment = async () => {
    try {
      if (replyingTo) {
        await createCommentReply({
          commentId: replyingTo.commentId,
          content: commentContent
        })
        updateComments()
        setreplyingTo(null)
      } else {
        await createComment({ postId, content: commentContent })
        updateComments()
      }
      setcommentContent('')
    } catch (e) {
      console.error('Error: ' + e)
    }
  }

  return (
    <>
      <Flex direction='column' height='calc(100% - 1.75rem)' overflowY='auto'>
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            setReplying={(user) => {
              setreplyingTo(user)
            }}
            {...comment}
          />
        ))}
      </Flex>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          submitComment()
        }}
      >
        <InputGroup mt='1rem' mb='0.5rem' size='md'>
          {replyingTo && (
            <InputLeftAddon fontWeight={'bold'}>
              <CloseButton size='sm' colorScheme='red.400' onClick={() => setreplyingTo(null)} />@
              {replyingTo.name.split(' ')[0]}
            </InputLeftAddon>
          )}
          <Input
            value={commentContent}
            onChange={(e) => setcommentContent(e.target.value)}
            pr='4.5rem'
            type='text'
            placeholder='Add a comment...'
          />
          <InputRightElement width='4.5rem'>
            <Button h='1.75rem' size='sm' type='submit' disabled={commentContent.length == 0}>
              Post
            </Button>
          </InputRightElement>
        </InputGroup>
      </form>
    </>
  )
}

const Comment = ({ setReplying, ...props }: CommentProps) => {
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
        <Button
          fontSize='xs'
          variant='ghost'
          onClick={() => setReplying({ commentId: props.id, name: props.author.name })}
        >
          Reply
        </Button>
        {props.replies.length > 0 && (
          <Button onClick={() => setRepliesOpen((isOpen) => !isOpen)} fontSize='xs' variant='ghost'>
            {areRepliesOpen
              ? 'Close replies'
              : `${props.replies.length} ${props.replies.length == 1 ? ' Reply' : ' Replies'}`}
          </Button>
        )}
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
        <HStack spacing={6} my={1}>
          <Text fontSize='xs'>47m</Text>
          {/* <Button fontSize='xs' variant='ghost'>
            Reply
          </Button> */}
        </HStack>
      </Flex>
    </Flex>
  )
}
