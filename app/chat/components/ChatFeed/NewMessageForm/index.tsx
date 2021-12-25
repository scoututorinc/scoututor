import React, { useContext, useState } from 'react'
import { sendMessage, isTyping, ChatEngineContext } from 'react-chat-engine'
import { HStack, Input, IconButton } from '@chakra-ui/react'
import { FiSend } from 'react-icons/fi'
import AttachmentsInput from 'app/chat/components/ChatFeed/NewMessageForm/AttachmensInput'

const NewMessageForm = (props) => {
  const { conn, activeChat, messages, setMessages } = useContext(ChatEngineContext)
  const [value, setValue] = useState('')
  const [trigger, setTrigger] = useState(0)
  const [attachments, setAttachments] = useState([])

  const handleChange = (event) => {
    setValue(event.target.value)
    setTrigger((trigger + 1) % 4)
    if (trigger === 1) {
      conn && isTyping(conn, activeChat)
    }
  }

  const handleSubmit = () => {
    if (!conn) return

    let text = value.trim()
    if (text.length > 11 && text.slice(-11) === '<p><br></p>') {
      text = text.substr(0, text.length - 11)
    }
    const custom_json = { sender_id: Date.now().toString() }
    const sender_username = conn.userName ? conn.userName : conn.senderUsername
    const created = new Date()
      .toISOString()
      .replace('T', ' ')
      .replace('Z', `${Math.floor(Math.random() * 1000)}+00:00`)
    const data = { text, attachments, custom_json, sender_username, chat: activeChat, created }

    if (text.length > 0 || attachments.length > 0) {
      sendMessage(conn, activeChat, data, () => {})
    }

    setValue('')
    setAttachments([])

    let newMessages = { ...messages }
    newMessages[data.created] = data
    setMessages(newMessages)
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        handleSubmit()
      }}
      style={{ backgroundColor: '#fffffff' }}
    >
      <HStack spacing={2}>
        <Input
          value={value}
          onChange={(event) => handleChange(event)}
          borderColor='teal.400'
          borderWidth={2}
          placeholder='Send a message...'
        />
        <AttachmentsInput onSelectFiles={(attachments) => setAttachments(attachments)} />
        <IconButton
          colorScheme='teal'
          h={10}
          aria-label='Send message'
          icon={<FiSend />}
          type='submit'
        />
      </HStack>
    </form>
  )
}

export default NewMessageForm
