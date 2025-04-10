import { Server } from "socket.io";
import {
    InstanceDTOServe,
    WebSocketPayload,
    LogoutInstanceData
 } from "./../InstanceDTOServe";

export async function handleLogoutInstance(
  event: WebSocketPayload<LogoutInstanceData>,
  server: Server,
  instanceService: InstanceDTOServe
) {

  console.log(`[${event.instance}] 🔒 Evento logout.instance recebido`);

  try {
    const response = await instanceService.logoutInstance(event);
    if (response.success) {
    } else {
      console.warn(`[${event.instance}] ❗ Falha no logout: ${response.error}`);
    }
  } catch (err) {
    console.error(`[${event.instance}] ❗ Erro ao tratar logout:`, err);
  }
  server.to(event.instance).emit(`logout.instance:${event.instance}`, {});
}