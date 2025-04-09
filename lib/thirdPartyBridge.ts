// import { Server as SocketIOServer } from "socket.io";
// import socketIOClient from 'socket.io-client'

// export const connectToExternalSocket = (io: SocketIOServer) => {
//   const externalSocket = socketIOClient("wss://servidor-exemplo.com", {
//     transports: ["websocket"]
//   });

//   externalSocket.on("connect", () => {
//     console.log("🌐 Conectado ao servidor externo");
//   });

//   externalSocket.on("UPDATE_CLIENT_DATA", (data: Event) => {
//     console.log("📡 Evento recebido do servidor externo:", data);

//     // Repassa para os clients conectados
//     io.emit("client:update", data);
//   });

//   externalSocket.on("disconnect", () => {
//     console.log("⚠️ Desconectado do servidor externo");
//   });
// };