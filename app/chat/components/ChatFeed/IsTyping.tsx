import React, { useState, useRef, useContext, useEffect } from 'react'
import { ChatEngineContext } from 'react-chat-engine'
import { Text } from '@chakra-ui/react'

const IsTyping = (props) => {
  const didMountRef = useRef(false)
  const [currentTime, setCurrentTime] = useState(Date.now())
  const { conn, activeChat, typingCounter } = useContext(ChatEngineContext)
  const typers = typingCounter && typingCounter[activeChat] ? typingCounter[activeChat] : []

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true
      setInterval(() => {
        setCurrentTime(Date.now())
      }, 1000)
    }
  })

  if (!conn || conn === null) return <div />

  return (
    <div>
      {Object.keys(typers).map((username, index) => {
        if (conn.userName !== username && currentTime < typers[username] + 2000) {
          return <Text key={`typer_${index}`}>{`${username} is typing...`}</Text>
        } else {
          return <div key={`typer_${index}`} />
        }
      })}
    </div>
  )
}

export default IsTyping
