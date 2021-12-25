import React, { Context, useContext } from 'react'
import { Flex, Box, HStack, VStack, Text, Heading, Img, Divider } from '@chakra-ui/react'
import jQuery from 'jquery'
import { Avatar, ChatEngineContext } from 'react-chat-engine'
import Loading from 'app/chat/components/ChatList/ChatCard/Loading'
import _ from 'lodash'
const { htmlToText } = require('html-to-text')
import { getDateTime } from 'app/chat/utils/timezone'

type UserChat = {
  id: number
  loading: boolean
  admin: {
    avatar?: string
    custom_json?: string
    first_name: string
    last_name: string
    username: string
  }
  access_key: string
  attachments: []
  created: string
  custom_json?: string
  is_authenticated: boolean
  is_direct_chat: boolean
  last_message: {
    attachments: []
    created: string
    sender: {
      avatar?: string
      first_name: string
      is_online: boolean
      last_name: string
      username: string
    }
    text: string
  }
  title: string
  people: {
    person: {
      avatar?: string
      first_name: string
      is_online: boolean
      last_name: string
      username: string
    }
  }[]
}

const convertDateToString = (date_string) => {
  let date = new Date(date_string)
  let today_date = new Date()

  // if it is today
  if (
    date.getDate() == today_date.getDate() &&
    date.getMonth() == today_date.getMonth() &&
    date.getFullYear() == today_date.getFullYear()
  ) {
    return date.toLocaleString('en-US', { hour: 'numeric', hour12: true })
  }

  // if it is within the last week
  return date.getDay() + '/' + date.getMonth() + '/' + date.getFullYear()
}

const ChatCard = (props: UserChat) => {
  const { conn, activeChat, setActiveChat } = useContext(ChatEngineContext)

  if (_.isEmpty(props) || props.loading) return <Loading />
  if (!conn || conn === null) return <div />

  const otherPerson = props.people.find((person) => conn.userName != person.person.username)
  const title = props.is_direct_chat && otherPerson ? otherPerson.person.username : props.title

  let lastMessage = htmlToText(props.last_message.text, {})
  if (!lastMessage) {
    lastMessage =
      props.last_message.attachments.length > 0
        ? `${props.last_message.attachments.length} image${
            props.last_message.attachments.length > 1 ? 's' : ''
          }`
        : 'Say hello!'
  }

  const didReadLastMessage = (chat) => {
    let didReadLastMessage = true
    chat.people.map((chat_person) => {
      if (conn.userName === chat_person.person.username) {
        didReadLastMessage = chat.last_message.id === chat_person.last_read
      }
    })
    return didReadLastMessage
  }

  const daySinceSent = (date) => {
    if (!date) return ''
    return getDateTime(date, conn.offset).toString().substr(4, 6)
  }

  return props ? (
    <Flex justifyContent='center'>
      <Box
        as='button'
        onClick={() => {
          setActiveChat(props.id)
        }}
        w='90%'
        px={4}
        bg='#EDF2F7'
        borderWidth={activeChat == props.id ? 2 : -2}
        borderColor='teal.400'
        borderRadius={6}
        justifyContent='center'
        my={2}
      >
        <HStack justifyContent='space-between' spacing={4} py={4}>
          <Avatar
            avatar={props.people.at(0)?.person.avatar}
            username={props.people.at(0)?.person.username}
            is_online={props.people.at(0)?.person.is_online}
          />
          <VStack w='100%' alignItems='start' spacing={2}>
            <Heading size='xs'>{props.title}</Heading>
            {props.last_message.text != '' && (
              <HStack justifyContent='space-between'>
                <Text fontSize='xs'>{lastMessage} </Text>
                <Text fontSize='xs'>{daySinceSent(props.last_message.created)}</Text>
              </HStack>
            )}
          </VStack>
        </HStack>
      </Box>
    </Flex>
  ) : (
    <Loading />
  )
}

export default ChatCard
