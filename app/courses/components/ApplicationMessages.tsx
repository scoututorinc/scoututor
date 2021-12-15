import React, { useState } from 'react'
import { Flex, HStack, Img, Text, Button, Divider } from '@chakra-ui/react'

type ApplicationMessageProps = {
  content: string
  author: {
    name: string
    profilePicture: string | null
  }
}

type ApplicationMessagesProps = {
  messages: ApplicationMessageProps[]
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

export const ApplicationMessages = ({ messages }: ApplicationMessagesProps) => {
  return (
    <Flex direction='column' maxW='30%' overflowY='scroll'>
      {messages.map((message) => (
        <Message key={message.content} {...message} />
      ))}
    </Flex>
  )
}
