import { Server } from "socket.io";
import {
    InstanceDTOServe,
    WebSocketPayload,
    RemoveInstanceData
 } from "./../InstanceDTOServe";

export async function handleRemoveInstance(
  event: WebSocketPayload<RemoveInstanceData>,
  server: Server,
  instanceService: InstanceDTOServe
) {

  console.log(`[${event.instance}] 🗑️ Evento remove.instance recebido`);
  console.log(event)
  try {
    const response = await instanceService.deleteInstance(event);
    if (response.success) {
    } else {
      console.warn(`[${event.instance}] ❗ Falha ao remover instância: ${response.error}`);
    }
  } catch (err) {
    console.error(`[${event.instance}] ❗ Erro ao tratar remoção:`, err);
  }

  server.to(event.instance).emit(`remove.instance:${event.instance}`, {});
}