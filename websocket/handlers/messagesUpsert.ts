import { Server } from "socket.io";
import {
    InstanceDTOServe,
    WebSocketPayload
 } from "./../InstanceDTOServe";

export function handleMessagesUpsert(
  event: WebSocketPayload<any>,
  server: Server
) {
    
  console.log(`[${event.instance}] ✉️ Evento messages.upsert recebido`);
  if (!event?.instance || !event.data) return;
  server.to(event.instance).emit(`MESSAGES_UPSERT:${event.instance}`, event.data);
}