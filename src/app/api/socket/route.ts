import { NextApiRequest, NextApiResponse } from "next"
import { Server as HTTPServer } from "http"
import { Server as IOServer } from "socket.io"
import { getSocketServerInstance } from "@/lib/localSocketServer"

export const config = {
  api: {
    bodyParser: false
  }
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if ((res.socket as any).server.io) {
    console.log("Socket.IO já inicializado")
  } else {
    console.log("Iniciando Socket.IO")
  
    if (res.socket){
      const io = getSocketServerInstance((res.socket as any).server)
      ;(res.socket as any).server.io = io
    }
   
  }
  res.end()
}