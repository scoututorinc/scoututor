import React, { useContext, CSSProperties } from 'react'

import { ChatEngineContext } from 'react-chat-engine'
import { Flex, Divider } from '@chakra-ui/react'

import PeopleSettings from 'app/chat/components/ChatSettings/PeopleSettings'
import PhotosSettings from 'app/chat/components/ChatSettings/PhotosSettings'
import OptionsSettings from 'app/chat/components/ChatSettings/OptionsSettings'
import ChatSettingsTop from 'app/chat/components/ChatSettings/ChatSettingsTop'

const ChatSettings = (props) => {
  const { conn, chats, activeChat } = useContext(ChatEngineContext)
  const chat = chats && chats[activeChat]

  if (conn === null) return <div />

  return (
    <Flex mx={4} orientation='row'>
      <Divider h='calc(100vh - 130px)' orientation='vertical' />

      <div style={styles.settingsContainer} className='ce-settings'>
        <div style={{ width: '90%', paddingLeft: '5%' }} className='ce-settings-container'>
          {props.renderChatSettingsTop ? (
            props.renderChatSettingsTop(conn, chat)
          ) : (
            <ChatSettingsTop />
          )}

          {props.renderPeopleSettings ? props.renderPeopleSettings(conn, chat) : <PeopleSettings />}

          {props.renderPhotosSettings ? props.renderPhotosSettings(chat) : <PhotosSettings />}

          {conn && chat && conn.userName === chat.admin.username && (
            <div>
              {props.renderOptionsSettings ? (
                props.renderOptionsSettings(conn, chat)
              ) : (
                <OptionsSettings />
              )}
            </div>
          )}
        </div>
      </div>
    </Flex>
  )
}

export default ChatSettings

const styles: Record<string, CSSProperties> = {
  settingsContainer: {
    height: '100%',
    width: '100%',
    overflowY: 'hidden',
    overflowX: 'hidden',
    backgroundColor: 'white',
    fontFamily: 'Inter'
  }
}
