'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'

interface SocketContextType {
  socket: Socket | null
}

const SocketContext = createContext<SocketContextType>({ socket: null })

export function useSocket() {
  const context = useContext(SocketContext)
  if (!context) {
    throw new Error('useSocket must be used within a Providers component')
  }
  return context
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [socket, setSocket] = useState<Socket | null>(null)

  useEffect(() => {
    const socketIo = io(process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3001')
    setSocket(socketIo)

    return () => {
      socketIo.disconnect()
    }
  }, [])

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  )
}