import React, { useState, useRef, useContext, useEffect } from 'react'
import { ChatEngineContext, getLatestChats, getChatsBefore } from 'react-chat-engine'
import { Flex, Divider, VStack } from '@chakra-ui/react'
import { getDateTime } from 'app/chat/utils/timezone'
import NewChatForm from 'app/chat/components/ChatList/NewChatForm'
import ChatCard from 'app/chat/components/ChatList/ChatCard'
import _ from 'lodash'

const interval = 33

const ChatList = (props) => {
  const didMountRef = useRef(false)
  const [loadChats, setLoadChats] = useState(false)
  const [hasMoreChats, setHasMoreChats] = useState(true)
  const { conn, chats, setChats, setActiveChat } = useContext(ChatEngineContext)

  const chatList = sortChats(
    chats ? Object.values(chats) : [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
  )

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true

      getLatestChats(props, interval, (chats) => {
        onGetChats(chats)
        chats.length > 0 && setActiveChat(chats[0].id)
      })
    }
  })

  useEffect(() => {
    if (!loadChats) return
    const chatList = chats !== null ? sortChats(Object.values(chats)) : []
    if (chatList.length > 0) {
      const before = chatList[chatList.length - 1].created
      getChatsBefore(props, before, interval, (chats) => onGetChats(chats))
    }
  })

  function sortChats(chats) {
    return chats.sort((a, b) => {
      const aDate =
        a.last_message && a.last_message.created
          ? getDateTime(a.last_message.created, props.offset)
          : getDateTime(a.created, props.offset)
      const bDate =
        b.last_message && b.last_message.created
          ? getDateTime(b.last_message.created, props.offset)
          : getDateTime(b.created, props.offset)
      return new Date(bDate).getTime() - new Date(aDate).getTime()
    })
  }

  const onGetChats = (chatList) => {
    setLoadChats(false)
    const oldChats = chats !== null ? chats : {}
    const newChats = _.mapKeys({ ...chatList }, 'id')
    const allChats = { ...oldChats, ...newChats }
    setChats(allChats)
    interval > chatList.length && setHasMoreChats(false)
  }

  function renderChats(chats) {
    return chats.map((chat, index) => {
      if (!chat) {
        return <div key={`chat_${index}`} />
      } else if (props.renderChatCard) {
        return <div key={`chat_${index}`}>{props.renderChatCard(chat, index)}</div>
      } else {
        return (
          <div
            key={`chat_${index}`}
            onClick={() => props.onChatClick && props.onChatClick(chat.id)}
          >
            <ChatCard {...chat} />
          </div>
        )
      }
    })
  }

  return (
    <Flex direction='row'>
      <Flex w='100%' direction='column' alignItems='center'>
        <NewChatForm {...props.creds} />
        <Flex h='calc(100vh - 200px)' w='100%' direction='column' overflowY='scroll'>
          {renderChats(chatList)}
        </Flex>
      </Flex>
      <Divider h='calc(100vh - 130px)' orientation='vertical' px={4} />
    </Flex>
  )
}

export default ChatList
