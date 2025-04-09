// lib/socketManager.ts
// import socketIOClient from 'socket.io-client'
// import { Server as IOServer } from 'socket.io'
// import { Server as HTTPServer } from 'http'

// type Event = any

// const socketMap = new Map<string, any>()

// export function initializeServerSocket(instanceId: string, io: IOServer): any {
//   if (socketMap.has(instanceId)) {
//     console.log(`Socket já existe para instância: ${instanceId}`)
//     return socketMap.get(instanceId)
//   }

//   console.log(`Inicializando socket para instância: ${instanceId}`)
  
//   // Conectar ao servidor terceiro
//   const socket = socketIOClient(`wss://evolutionapi.faixinhabot.cloud/${instanceId}?transports=websocket`, {
//     transports: ['websocket'],
//     reconnection: true,
//     reconnectionAttempts: 5,
//     reconnectionDelay: 1000,
//     timeout: 20000
//   })

//   socket.on('connect', () => {
//     console.log(`[${instanceId}] Conectado ao servidor terceiro`)
//   })

//   // Processar eventos do servidor terceiro e encaminhar para os clientes
//   socket.on('QRCODE_UPDATED', (event: Event) => {
//     console.log(`[${instanceId}] QRCODE_UPDATED:`, event)
//     // Tratar, transformar ou filtrar o evento se necessário
//     io.emit(`QRCODE_UPDATED:${instanceId}`, event)
//   })

//   socket.on('CONNECTION_UPDATE', (event: Event) => {
//     console.log(`[${instanceId}] CONNECTION_UPDATE:`, event)
//     // Tratar, transformar ou filtrar o evento se necessário
//     io.emit(`CONNECTION_UPDATE:${instanceId}`, event)
//   })

//   socket.on('APPLICATION_STARTUP', (event: Event) => {
//     console.log(`[${instanceId}] APPLICATION_STARTUP:`, event)
//     // Tratar, transformar ou filtrar o evento se necessário
//     io.emit(`APPLICATION_STARTUP:${instanceId}`, event)
//   })

//   socket.on('LOGOUT_INSTANCE', (event: Event) => {
//     console.log(`[${instanceId}] LOGOUT_INSTANCE:`, event)
//     // Tratar, transformar ou filtrar o evento se necessário
//     io.emit(`LOGOUT_INSTANCE:${instanceId}`, event)
//   })

//   socket.on('MESSAGES_UPSERT', (event: Event) => {
//     console.log(`[${instanceId}] MESSAGES_UPSERT:`, event)
//     // Tratar, transformar ou filtrar o evento se necessário
//     io.emit(`MESSAGES_UPSERT:${instanceId}`, event)
//   })

//   socket.on('disconnect', () => {
//     console.log(`[${instanceId}] Desconectado do servidor terceiro`)
//   })

//   socket.on('error', (error: Event) => {
//     console.error(`[${instanceId}] Erro de socket:`, error)
//   })

//   socketMap.set(instanceId, socket)

//   return socket
// }

// export function getSocket(instanceId: string): any {
//   return socketMap.get(instanceId)
// }

// export function closeSocket(instanceId: string) {
//   const socket = socketMap.get(instanceId)
//   if (socket) {
//     console.log(`Fechando socket para instância: ${instanceId}`)
//     socket.disconnect()
//     socketMap.delete(instanceId)
//   }
// }

// export function listActiveSockets(): string[] {
//   return Array.from(socketMap.keys())
// }

// export const socket = socketIOClient({
//   path: "/api/socket",
//   transports: ["websocket"]
// });