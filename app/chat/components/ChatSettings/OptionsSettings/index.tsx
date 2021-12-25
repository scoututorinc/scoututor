import React, { useContext } from 'react'

import { deleteChat, ChatEngineContext } from 'react-chat-engine'
import { Button } from '@chakra-ui/react'
import { BsTrashFill } from 'react-icons/bs'

import SettingsBlock from 'app/chat/components/ChatSettings/SettingsBlock'

const OptionsSettings = () => {
  const { conn, chats, activeChat } = useContext(ChatEngineContext)
  const chat = chats && chats[activeChat]

  if (!chat) return <div />

  return (
    <div style={{ borderTop: '1px solid #f0f0f0' }}>
      <SettingsBlock id='ce-options-drop-down' label='Options'>
        <div>
          <div style={{ height: '8px' }} />

          <Button
            id='ce-delete-chat-button'
            leftIcon={<BsTrashFill />}
            onClick={() => deleteChat(conn, chat.id, (data) => {})}
            style={{ width: '100%', marginBottom: '12px' }}
            colorScheme='red'
          >
            Delete
          </Button>
        </div>
      </SettingsBlock>
    </div>
  )
}

export default OptionsSettings
