import React, { useRef, useState, useContext, useEffect } from 'react'
import { ChatEngineContext } from 'react-chat-engine'
import { Button } from '@chakra-ui/react'
import { AiFillCaretDown } from 'react-icons/ai'
import { animateScroll } from 'react-scroll'

const ScrollDownBar = (props) => {
  const didMountRef = useRef(false)
  const [isVisible, setIsVisible] = useState(false)
  const { conn, chats, activeChat, isBottomVisible } = useContext(ChatEngineContext)
  const chat = chats && chats[activeChat]

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true
      setTimeout(() => setIsVisible(true), props && props.renderDelay ? props.renderDelay : 0)
    }
  })

  if (conn === null || !chat || chat === null) return <div />

  let lastReadMessage = undefined
  chat.people.map((person) => {
    if (person.person.username === conn.userName) {
      lastReadMessage = person.last_read
    }
  })

  if (
    !isVisible ||
    isBottomVisible ||
    chat.last_message.id === undefined ||
    chat.last_message.id === lastReadMessage
  ) {
    return <div />
  }

  return (
    <div
      style={{
        bottom: '94px',
        left: 'calc(50% - 78px)',
        position: 'absolute',
        fontSize: '15px'
      }}
    >
      <Button
        leftIcon={<AiFillCaretDown />}
        onClick={() =>
          animateScroll.scrollToBottom({ duration: 33, containerId: 'ce-feed-container' })
        }
        disabled={true}
        colorScheme='teal'
      >
        {conn.userName ? 'Unread Messages' : 'Scroll to Bottom'}
      </Button>
    </div>
  )
}

export default ScrollDownBar
