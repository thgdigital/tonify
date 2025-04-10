import next from "next";
import { createServer } from "http";
import { parse } from "url";
import { Server as IOServer } from "socket.io";
import { initializeServerSocket } from "./websocket/clientBridge";
import { setupSocketServer } from "./websocket/socketServer";
import { InstanceDTOServe, } from "./websocket/InstanceDTOServe";

const nextApp = next({ dev: process.env.NODE_ENV !== "production" });
const handle = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
  const server = createServer((req, res) => {
    handle(req, res, parse(req.url || "", true));
  });

  const io = new IOServer(server, {
    path: "/api/socket",
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  let serverDTO = new InstanceDTOServe()
  setupSocketServer(io);           // 🎧 Cliente frontend
  initializeServerSocket(io, serverDTO);      // 🔌 Evolution API

  server.listen(3000, () => {
    console.log("🚀 Servidor rodando em http://localhost:3000");
  });
});