import { prisma } from "../src/providers/prisma";

export interface UpdateInstanceResponse {
  success: boolean;
  data?: any;
  error?: string;
}

export interface WebSocketPayload<T> {
  local: string;
  event: string;
  instance: string;
  data: T;
  server_url: string;
  date_time: string;
  sender?: string;
  apikey: string;
}

export interface ConnectionUpdateData {
  instance: string;
  state: string;
  statusReason: number;
}

export interface LogoutInstanceData {}
export interface RemoveInstanceData {}

type EventHandler<T> = (
  payload: WebSocketPayload<T>,
  updateInstance: UpdateInstanceResponse
) => Promise<UpdateInstanceResponse>;

export class InstanceDTOServe {
  private eventHandlers: Record<string, EventHandler<any>>;

  constructor() {
    this.eventHandlers = {
      "connection.update": this.handleConnectionUpdate.bind(this),
      "logout.instance": this.handleLogoutInstance.bind(this),
      "remove.instance": this.handleRemoveInstance.bind(this),
    };
  }

  async connectionUpdate(payload: WebSocketPayload<ConnectionUpdateData>): Promise<UpdateInstanceResponse> {
    const instance = await this.getInstance(payload);
    if (!instance.success) return instance;
    return this.handleConnectionUpdate(payload, instance);
  }

  async logoutInstance(payload: WebSocketPayload<LogoutInstanceData>): Promise<UpdateInstanceResponse> {
    const instance = await this.getInstance(payload);
    if (!instance.success) return instance;
    return this.handleLogoutInstance(payload, instance);
  }

  async deleteInstance(payload: WebSocketPayload<RemoveInstanceData>): Promise<UpdateInstanceResponse> {
    const instance = await this.getInstance(payload);
    if (!instance.success) return instance;
    return this.handleRemoveInstance(payload, instance);
  }

  async getInstance(instanceDTO: WebSocketPayload<any>): Promise<UpdateInstanceResponse> {
    try {
      const instance = await prisma.instance.findFirst({
        where: {
          instanceId: instanceDTO.instance,
          hash: instanceDTO.apikey,
        },
      });

      if (!instance) {
        return {
          success: false,
          error: `Instance with ID "${instanceDTO.instance}" not found or invalid API key.`,
        };
      }

      return { success: true, data: instance };
    } catch (error) {
      return { success: false, error: `Failed to fetch instance: ${String(error)}` };
    }
  }

  private async handleConnectionUpdate(
    payload: WebSocketPayload<ConnectionUpdateData>,
    updateInstance: UpdateInstanceResponse
  ): Promise<UpdateInstanceResponse> {
    try {
      const updatedInstance = await prisma.instance.update({
        where: { id: updateInstance.data.id },
        data: { status: payload.data.state },
      });

      if(!updatedInstance) {
        return { success: false, error: `Não existe instancia` };
      }
      console.log(`[${payload.instance}] 🔄 Atualizando status da instância: ${payload.data.state}`);
      return { success: true, data: updatedInstance };
    } catch (error) {
      console.error(`[${payload.instance}] ❗ Erro ao atualizar conexão: ${String(error)}`);
      return { success: false, error: `Failed to update instance status: ${String(error)}` };
    }
  }

  private async handleLogoutInstance(
    payload: WebSocketPayload<LogoutInstanceData>,
    updateInstance: UpdateInstanceResponse
  ): Promise<UpdateInstanceResponse> {
    try {
      // Exemplo: atualiza status no logout
      const deletedInstance = await prisma.instance.update({
        where: { id: updateInstance.data.id },
        data: { status: "disconnected" },
      });

      if (!deletedInstance) {
        return { success: false, error: `Não existe instancia` };
      }

      console.log(`[${payload.instance}] 🔄 Logout da instância: ${payload.instance}`);

      return { success: true };
    } catch (error) {
      return { success: false, error: `Failed to logout instance: ${String(error)}` };
    }
  }

  private async handleRemoveInstance(
    payload: WebSocketPayload<RemoveInstanceData>,
    updateInstance: UpdateInstanceResponse
  ): Promise<UpdateInstanceResponse> {
    try {
      const deletedInstance = await prisma.instance.delete({
        where: { id: updateInstance.data.id },
      });
      
      if (!deletedInstance) {
        return { success: false, error: `Não existe instancia` };
      }

      console.log(`[${payload.instance}] 🗑️ Removendo instância: ${payload.instance}`);

      return { success: true };
    } catch (error) {
      return { success: false, error: `Failed to delete instance: ${String(error)}` };
    }
  }

  async handleWebSocketEvent<T>(
    payload: WebSocketPayload<T>,
    updateInstance: UpdateInstanceResponse
  ): Promise<UpdateInstanceResponse> {
    const handler = this.eventHandlers[payload.event];
    if (!handler) return this.handleUnknownEvent(payload);
    return handler(payload, updateInstance);
  }

  private async handleUnknownEvent<T>(
    payload: WebSocketPayload<T>
  ): Promise<UpdateInstanceResponse> {
    return { success: false, error: `Unknown event: ${payload.event}` };
  }
}