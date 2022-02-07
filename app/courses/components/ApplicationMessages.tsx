import React, { useState } from 'react'
import {
  Flex,
  HStack,
  Img,
  Text,
  Button,
  Divider,
  InputGroup,
  InputRightElement,
  Input,
  Spacer
} from '@chakra-ui/react'
import createCourseApplicationMessage from '../mutations/createCourseApplicationMessage'
import { useMutation } from 'blitz'

type ApplicationMessagesProps = {
  applicationId: number
  updateMessages: (newMessages: ApplicationMessageProps[]) => void
  messages: ApplicationMessageProps[]
}

type ApplicationMessageProps = {
  content: string
  author: {
    name: string
    profilePicture: string | null
  }
}

export const ApplicationMessages = ({
  applicationId,
  updateMessages,
  messages
}: ApplicationMessagesProps) => {
  const [messageContent, setmessageContent] = useState('')
  const [createApplicationMessage] = useMutation(createCourseApplicationMessage)
  const submitApplicationMessage = async () => {
    try {
      const newAppicationMessage = await createApplicationMessage({
        applicationId,
        content: messageContent
      })
      updateMessages([...messages, newAppicationMessage])
      setmessageContent('')
    } catch (e) {
      console.error('Error: ' + e)
    }
  }

  return (
    <Flex direction='column' flexGrow={1} height='100%'>
      <Flex direction='column' height='calc(100% - 1.75rem)' overflowY='auto'>
        {messages.map((message) => (
          <Message key={message.content} {...message} />
        ))}
      </Flex>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          submitApplicationMessage()
        }}
      >
        <InputGroup mt='1rem' mb='0.5rem' size='md'>
          <Input
            value={messageContent}
            onChange={(e) => setmessageContent(e.target.value)}
            pr='4.5rem'
            type='text'
            placeholder='Add a comment...'
          />
          <InputRightElement width='4.5rem'>
            <Button h='1.75rem' size='sm' type='submit' disabled={messageContent.length == 0}>
              Post
            </Button>
          </InputRightElement>
        </InputGroup>
      </form>
    </Flex>
  )
}

const Message = (props: ApplicationMessageProps) => {
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
      </HStack>
      <Divider mb={4} />
    </Flex>
  )
}
