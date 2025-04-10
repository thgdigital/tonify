import { Server as IOServer, Socket } from "socket.io";
// import { verifyToken } from "../lib/auth"; // função que valida JWT/session

export function setupSocketServer(io: IOServer) {
  io.on("connection", async (socket: Socket) => {
    console.log("🟢 Cliente conectado");

    // 🔐 Valida sessão ou token
    const token = socket.handshake.auth?.token;
    // const session = await verifyToken(token);

    // if (!session || !session.user?.id) {
    //   console.warn("❌ Conexão rejeitada: não autenticado");
    //   socket.disconnect();
    //   return;
    // }

    // const userId = session.user.id;

    // Cliente envia o ID da instância que quer escutar
    socket.on("join_instance", (instanceId: string) => {
      console.log(`👤 Usuário  entrou na sala da instância ${instanceId}`);
      socket.join(instanceId);
    });

    socket.on("disconnect", () => {
      console.log("🔴 Cliente desconectado");
    });
  });
}