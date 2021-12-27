import React, { useContext } from 'react'
import { ChatEngineContext } from 'react-chat-engine'
import { VStack, Heading, Text } from '@chakra-ui/react'
import { getDateTime, formatDateTime } from 'app/chat/utils/timezone'

const ChatHeader = (props) => {
  const { conn, chats, activeChat } = useContext(ChatEngineContext)
  const chat = chats ? chats[activeChat] : undefined
  const otherPerson =
    chat && conn && chat.people.find((person) => person.person.username !== conn.userName)
  const title = chat
    ? chat.is_direct_chat && otherPerson
      ? otherPerson.person.username
      : chat.title
    : undefined

  var text = 'Say hello!'
  if (!chat) {
    text = 'Loading...'
  } else if (chat.last_message.created && chat.last_message.created.length > 0) {
    const dateTime = getDateTime(chat.last_message.created, conn ? conn.offset : undefined)
    text = `Active ${formatDateTime(dateTime)}`
  }

  return (
    <VStack spacing={4} w='100%' mt={4} background='#ffffff'>
      <VStack spacing={2} alignItems='center'>
        <Heading size='md'>{title}</Heading>
        <Text>{text}</Text>
      </VStack>
    </VStack>
  )
}

export default ChatHeader
