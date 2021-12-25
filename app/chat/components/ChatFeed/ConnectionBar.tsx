import React, { useRef, useState, useEffect, useContext } from 'react'
import { ChatEngineContext } from 'react-chat-engine'
import { Button } from '@chakra-ui/react'
import { AiOutlineSync } from 'react-icons/ai'

const ConnectionBar = (props) => {
  const didMountRef = useRef(false)
  const [isVisible, setIsVisible] = useState(false)
  const { connecting } = useContext(ChatEngineContext)

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true
      setTimeout(() => setIsVisible(true), props && props.renderDelay ? props.renderDelay : 0)
    }
  })

  if (!connecting || !isVisible) return <div />

  return (
    <div
      style={{
        bottom: '66px',
        left: 'calc(50% - 78px)',
        position: 'absolute',
        fontSize: '15px'
      }}
    >
      <Button leftIcon={<AiOutlineSync />} disabled={true} colorScheme='tomato'>
        Connecting
      </Button>
    </div>
  )
}

export default ConnectionBar
