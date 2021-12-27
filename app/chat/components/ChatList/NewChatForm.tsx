import React, { useState, useContext } from 'react'
import { HStack, Input, IconButton } from '@chakra-ui/react'
import { AiOutlinePlus } from 'react-icons/ai'
import { newChat, ChatEngineContext } from 'react-chat-engine'

const NewPersonalizedChatForm = (props) => {
  const { conn } = useContext(ChatEngineContext)
  const [chatName, setChatName] = useState('')
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        // TODO: Present a dialog confirming the action &
        // TODO: Think about what is the succeeding action
        newChat(conn, { title: chatName }, () => console.log('do some other stuff'))
      }}
    >
      <HStack justifyContent='center' spacing={2} mb={4} mt={2}>
        <Input
          value={chatName}
          onChange={(event) => setChatName(event.target.value)}
          colorScheme='teal.400'
          placeholder='Create new chat'
        />
        <IconButton
          aria-label='Create chat'
          colorScheme='teal'
          icon={<AiOutlinePlus />}
          type='submit'
        />
      </HStack>
    </form>
  )
}

export default NewPersonalizedChatForm
