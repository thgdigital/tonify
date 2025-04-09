
import next from "next";
import { createServer } from "http";
import { parse } from "url";
import { Server as IOServer, Socket } from "socket.io";
import { IncomingMessage, ServerResponse } from "http";
import { io } from "socket.io-client";

// Configuração Next.js
const nextApp = next({ dev: process.env.NODE_ENV !== "production" });
const handle = nextApp.getRequestHandler();

// ID fixo da instância de teste (você pode dinamizar)
const instanceId = "f3f394e4-73cb-461b-bcb6-c634fa34d735";

// Armazena os sockets conectados
const clients = new Set<Socket>();

// Inicia o app
nextApp.prepare().then(() => {
  const server = createServer((req: IncomingMessage, res: ServerResponse) => {
    handle(req, res, parse(req.url || "", true));
  });

  const io = new IOServer(server, {
    path: "/api/socket", // rota WebSocket
    cors: {
      origin: "*", // permitir front-end acessar
      methods: ["GET", "POST"],
    },
  });

  // Quando cliente se conecta
  io.on("connection", (socket) => {
    console.log("✅ Cliente conectado via Socket.IO");
    clients.add(socket);

    // Recebe mensagens do client
    socket.on("ping", () => {
      console.log("📡 Ping do cliente");
      socket.emit("pong");
    });

    socket.on("disconnect", () => {
      clients.delete(socket);
      console.log("❌ Cliente desconectado");
    });

    // Aqui você inicializa a ponte com servidor externo
    if (!socketMap.has(instanceId)) {
      initializeServerSocket(instanceId, io);
    }
  });

  // Inicia servidor
  server.listen(3000, () => {
    console.log("🚀 Servidor pronto em http://localhost:3000");
  });
});


// =======================
// 🔌 Conexão com servidor externo (socket.io-client)
// =======================

type Event = any;
const socketMap = new Map<string, any>();

export function initializeServerSocket(instanceId: string, server: IOServer): any {

  
  const socket = io(`${process.env.EVOLUTION_BASE_URL}/${instanceId}?transports=websocket`, {
    transports: ['websocket'],
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    timeout: 20000
  });

  socket.on("connect", () => {
    console.log(`[${instanceId}] 🔗 Conectado ao servidor terceiro`);
  });

  socket.on("messages.upsert", (event: Event) => {
    console.log(`[${instanceId}] 🔄 Evento messages.upsert recebido`);
    
    server.emit(`messages.upsert`, event); // envia para todos os clientes
  });

  socket.on("disconnect", () => {
    console.log(`[${instanceId}] 🔌 Desconectado do servidor terceiro`);
  });

  socket.on("error", (err: any) => {
    console.error(`[${instanceId}] ❗ Erro no socket externo:`, err);
  });

  socketMap.set(instanceId, socket);
  return socket;
}