import { Server as IOServer, Socket } from "socket.io";
// import { verifyToken } from "../lib/auth"; // função que valida JWT/session

export function setupSocketServer(io: IOServer) {
  io.on("connection", async (socket: Socket) => {
    console.log("🟢 Cliente conectado");

      socket.on("join", ({ room }) => {
        socket.join(room);
        console.log(`✅ Cliente entrou na sala ${room}`);
      });
    
      socket.on("leave", ({ room }) => {
        socket.leave(room);
        console.log(`👋 Cliente saiu da sala ${room}`);
      });

      socket.on("disconnect", () => {
        console.log("🔴 Cliente desconectado");
      });
  });
}