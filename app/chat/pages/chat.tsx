import React, { useState, useEffect } from 'react'
import {
  BlitzPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
  invokeWithMiddleware,
  PromiseReturnType
} from 'blitz'
import { Box, VStack, Heading, Divider, Text } from '@chakra-ui/react'
import LoggedInLayout from 'app/core/layouts/LoggedInLayout'
import { ChatEngine } from 'react-chat-engine'
import NewChatForm from 'app/chat/components/ChatList/NewChatForm'
import ChatCard from 'app/chat/components/ChatList/ChatCard'
import ChatList from 'app/chat/components/ChatList/ChatList'
import ChatHeader from 'app/chat/components/ChatFeed/ChatHeader'
import IsTyping from 'app/chat/components/ChatFeed/IsTyping'
import ConnectionBar from 'app/chat/components/ChatFeed/ConnectionBar'
import ScrollDownBar from 'app/chat/components/ChatFeed/ScrollDownBar'
import NewMessageForm from 'app/chat/components/ChatFeed/NewMessageForm'
import ChatSettings from 'app/chat/components/ChatSettings'
import getCurrentUser from 'app/users/queries/getCurrentUser'

const Chat: BlitzPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  currentUser,
  projectId,
  error
}) => {
  const [chatReady, setChatReady] = useState(false)
  useEffect(() => setChatReady(true), [])
  return (
    <Box w='100%' p={10} overflowY='scroll'>
      <VStack spacing={2} justifyContent='start' alignItems='start' pb={6}>
        <Heading>Chat with your colleagues and tutors</Heading>
        <Divider />
      </VStack>
      {chatReady && (
        <div style={{ fontStyle: 'Inter' }}>
          <ChatEngine
            height='calc(100vh - 250px)'
            projectID={projectId}
            userName={currentUser?.name}
            userSecret={currentUser?.email}
            renderChatList={(chatAppState) => {
              return ChatList(chatAppState)
            }}
            renderChatCard={(chat, index) => {
              return ChatCard(chat)
            }}
            renderNewChatForm={(creds) => {
              return NewChatForm(creds)
            }}
            renderChatHeader={(chat) => {
              return ChatHeader(chat)
            }}
            renderIsTyping={(typers) => {
              return IsTyping(typers)
            }}
            renderConnectionBar={(chat) => {
              return ConnectionBar(chat)
            }}
            renderScrollDownBar={(chat) => {
              return ScrollDownBar(chat)
            }}
            renderNewMessageForm={(creds, chatId) => {
              return NewMessageForm({ creds: creds, chatId: chatId })
            }}
            renderChatSettings={(chatAppState) => {
              return ChatSettings(chatAppState)
            }}
          />
        </div>
      )}
    </Box>
  )
}

export const getServerSideProps: GetServerSideProps<{
  currentUser?: PromiseReturnType<typeof getCurrentUser>
  projectId?: string
  error?: any
}> = async (context) => {
  try {
    const currentUser = await invokeWithMiddleware(getCurrentUser, null, context)
    const projectId = process.env.CHAT_ENGINE_PROJECT_ID
    return {
      props: { currentUser, projectId }
    }
  } catch (e) {
    console.log(e)
    return {
      props: { error: e }
    }
  }
}

Chat.suppressFirstRenderFlicker = true
Chat.getLayout = (page) => <LoggedInLayout title='Chat'>{page}</LoggedInLayout>

export default Chat
