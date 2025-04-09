import type { Server as HTTPServer } from 'http'
import type { Socket as NetSocket } from 'net'
import type { Server as IOServer } from 'socket.io'
import type { NextApiResponse } from 'next'

declare module 'http' {
  interface Server {
    io?: IOServer
  }
}

declare global {
  namespace NodeJS {
    interface Socket extends NetSocket {
      server: HTTPServer & {
        io?: IOServer
      }
    }
  }

  // ✅ Aqui está o tipo que faltava
  type NextApiResponseWithSocket = NextApiResponse & {
    socket: NodeJS.Socket
  }
}

export {}