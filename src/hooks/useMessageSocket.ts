// hooks/useSocket.ts
'use client'

import { useEffect, useState, useRef} from 'react'
import {  Socket } from 'socket.io-client'
import socketIOClient from 'socket.io-client'

export function useSocket(instanceId: string) {
  const [socket, setSocket] = useState<Socket | null>(null)

  useEffect(() => {
    const socketIo = socketIOClient({
      path: '/api/socket',
      transports: ['websocket']
    })

    socketIo.on('connect', () => {
      console.log('[Client] conectado ao socket:', socketIo.id)
      socketIo.emit('init-instance', { instanceId })
    })

    socketIo.on('messages.upsert', (event: Event) => {
      console.log('[Client] Nova mensagem:', event)
    })

    setSocket(socketIo)

    return () => {
      socketIo.disconnect()
    }
  }, [instanceId])

  return socket
}

// src/hooks/useSocket.ts


