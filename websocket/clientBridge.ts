import { Server as IOServer } from "socket.io";
import { io as socketIOClient, Socket } from "socket.io-client";
import { registerSocketHandlers } from "./handlers";
import { InstanceDTOServe, } from "./InstanceDTOServe";

export function initializeServerSocket(io: IOServer,
     instanceService: InstanceDTOServe): Socket {
  const socket = socketIOClient(`${process.env.WSS_EVOLUTION_BASE_URL}/?transports=websocket`, {
    transports: ["websocket"],
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    timeout: 20000,
  });

  console.log("🌐 Conectando ao Evolution API...");

  socket.on("connect", () => {
    console.log("✅ Evolution API conectado.");
  });

  socket.on("disconnect", () => {
    console.warn("🔌 Evolution API desconectado.");
  });

  socket.on("error", (err) => {
    console.error("❗ Erro Evolution API:", err);
  });

  registerSocketHandlers(socket, io, instanceService); // 🔁 Handlers externos

  return socket;
}