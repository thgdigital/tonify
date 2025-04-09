import { Server as HTTPServer } from "http"
import { Server as IOServer } from "socket.io"
// import { initializeServerSocket } from './socketManager'

let io: IOServer | null = null

export function getSocketServerInstance(server: HTTPServer): IOServer {
  if (!io) {
    console.log('Criando nova instância do Socket.IO')
    io = new IOServer(server, {
      path: "/api/socket",
      addTrailingSlash: false,
      cors: {
        origin: "*",
        methods: ["GET", "POST"]
      },
      transports: ['websocket', 'polling'],
      pingTimeout: 60000,
      pingInterval: 25000
    })

    io.on("connection", (socket) => {
      console.log("Cliente conectado ao Socket.IO local")

      // Evento para abrir um socket para uma instância específica
      socket.on("openSocket", async (instanceId: string) => {
        console.log(`Abrindo socket para instância: ${instanceId}`)
        try {
          if (io) {
            // const serverSocket = initializeServerSocket(instanceId, io)
            socket.emit("socketOpened", { instanceId, success: true })
          }
        } catch (error) {
          console.error(`Erro ao abrir socket para instância ${instanceId}:`, error)
          socket.emit("socketOpened", { instanceId, success: false, error: error })
        }
      })

      // Evento para fechar um socket para uma instância específica
      socket.on("closeSocket", (instanceId: string) => {
        console.log(`Fechando socket para instância: ${instanceId}`)
        try {
          // Implementar lógica para fechar o socket
          socket.emit("socketClosed", { instanceId, success: true })
        } catch (error) {
          console.error(`Erro ao fechar socket para instância ${instanceId}:`, error)
          socket.emit("socketClosed", { instanceId, success: false, error: error })
        }
      })

      socket.on("disconnect", () => {
        console.log("Cliente desconectado do Socket.IO local")
      })
    })
  }

  return io
}