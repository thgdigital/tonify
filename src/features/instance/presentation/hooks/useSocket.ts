import { useEffect, useRef } from "react"
import { io, Socket } from "socket.io-client"

export function useSocket(url: string, options?: Record<string, any>) {
  const socketRef = useRef<Socket | null>(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    console.log("🔄 Inicializando conexão com o socket...")

    // Inicializar o socket
    socketRef.current = io(url, {
      transports: ["websocket"],
      ...options,
    })

    const socket = socketRef.current

    socket.on("connect", () => {
      console.log("✅ Socket conectado:", socket.id)
    })

    socket.on("disconnect", () => {
      console.log("🔌 Socket desconectado")
    })

    socket.on("connect_error", (error) => {
      console.error("❌ Erro de conexão:", error)
    })

    // Cleanup ao desmontar o componente
    return () => {
      if (socketRef.current) {
        console.log("🛑 Desconectando socket...")
        socketRef.current.disconnect()
      }
    }
  }, [url, options])

  return socketRef.current
}