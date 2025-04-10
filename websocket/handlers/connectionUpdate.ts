import { Server } from "socket.io";
import { InstanceDTOServe,
     WebSocketPayload,
     } from "./../InstanceDTOServe";


export async function handleConnectionUpdate(
  event: WebSocketPayload<any>,
  server: Server,
  instanceService: InstanceDTOServe
) {
  console.log(`[${event.instance}] 🔄 Evento connection.update recebido`);
  if (!event?.instance || !event.data) return;
  try {
    const response = await instanceService.connectionUpdate(event);
    if (response.success) {
 
    const clientStatus = mapBackendStatusToClient(event.data.state);

    emitClientStatus(server, event.instance, clientStatus, event.data.state,  event.data.statusReason);
   
} else {
      console.warn(`[${event.instance}] ❗ Falha ao atualizar conexão: ${response.error}`);
    }
  } catch (err) {
    console.error(`[${event.instance}] ❗ Erro ao tratar connection.update:`, err);
  }
}

function mapBackendStatusToClient(state: string): string {
    switch (state) {
      case "open":
        return "CONNECTED";
      case "close":
        return "DISCONNECTED";
      case "connecting":
        return "CONNECTING";
      case "refused":
        return "REFUSED";
      default:
        return "CONNECTING";
    }
  }

  function emitClientStatus(
    io: Server,
    instance: string,
    clientStatus: string,
    backendStatus: string,
    reason: number
  ) {
    
    console.log(`[${instance}] 📤 Emitindo status para client: ${clientStatus}`);
  
    io.to(instance).emit("client:connection_status", {
      instance,
      status: clientStatus,
      backendStatus,
      reason,
    });
  }