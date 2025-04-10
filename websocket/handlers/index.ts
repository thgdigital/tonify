import { Socket as ExternalSocket } from "socket.io-client";
import { Server as IOServer } from "socket.io";
import { handleConnectionUpdate } from "./connectionUpdate";
import { handleLogoutInstance } from "./logoutInstance";
import { handleRemoveInstance } from "./removeInstance";
import { handleMessagesUpsert } from "./messagesUpsert";
import { InstanceDTOServe,
     WebSocketPayload,
     ConnectionUpdateData,
     LogoutInstanceData,
     RemoveInstanceData,
     QrcodeUpdatedData
 } from "./../InstanceDTOServe";

export function registerSocketHandlers(
    socket: ExternalSocket,
    server: IOServer,
    instanceService: InstanceDTOServe
  ) {
    socket.on("connection.update", async (event: WebSocketPayload<ConnectionUpdateData>) => {
      handleConnectionUpdate(event, server, instanceService)
    });
    
    socket.on("logout.instance", async (event: WebSocketPayload<LogoutInstanceData>) => {
      handleLogoutInstance(event, server, instanceService)
  });
  
    socket.on("remove.instance", async (event: WebSocketPayload<RemoveInstanceData>) => {
      handleRemoveInstance(event, server, instanceService)
  });
  
    socket.on("messages.upsert", async (event: WebSocketPayload<any>) => {
      handleMessagesUpsert(event, server)
  });

  socket.on("qrcode.updated", async (event: WebSocketPayload<QrcodeUpdatedData>) => {
    console.log("🚀 Novo evento de QR Code recebido:", event);
    server.to(event.instance).emit(`qrcode.updated:${event.instance}`, event.data.qrcode);
  });
  
    socket.on("ping", () => {
      console.log(`🔁 Ping recebido`);
      socket.emit("pong");
    });
  }