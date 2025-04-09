import { createContext, useContext, ReactNode } from "react"
import { useSocket } from "@/hooks/useSocket"
import { Socket } from "socket.io-client"

interface SocketContextProps {
  socket: Socket | null
}

const SocketContext = createContext<SocketContextProps | undefined>(undefined)

export function SocketProvider({ children }: { children: ReactNode }) {
  const socket = useSocket("http://localhost:3000", { path: "/api/socket" })

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  )
}

export function useSocketContext() {
  const context = useContext(SocketContext)
  if (!context) {
    throw new Error("useSocketContext deve ser usado dentro de um SocketProvider")
  }
  return context
}