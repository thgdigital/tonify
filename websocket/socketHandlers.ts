import { Socket as ExternalSocket } from "socket.io-client";
import { Server as IOServer } from "socket.io";
import { InstanceDTOServe,
  WebSocketPayload,
  ConnectionUpdateData,
  LogoutInstanceData,
  RemoveInstanceData } from "./InstanceDTOServe";
import { handleConnectionUpdate } from "./handlers/connectionUpdate";
import { handleLogoutInstance } from "./handlers/logoutInstance";
import { handleRemoveInstance } from "./handlers/removeInstance";
import { handleMessagesUpsert } from "./handlers/messagesUpsert";

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

  socket.on("ping", () => {
    console.log(`🔁 Ping recebido`);
    socket.emit("pong");
  });
}