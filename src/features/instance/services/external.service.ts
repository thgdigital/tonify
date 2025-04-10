import { api } from "@/igniter.client";
import { PrismaClient } from "@prisma/client";

class ExternalService {
  private baseUrl: string;
  private apiKey: string;
  private webhookUrl: string;
  private webhookEvents: string[];

  constructor() {
    this.baseUrl = process.env.EVOLUTION_BASE_URL || '';
    this.apiKey = process.env.EVOLUTION_API_KEY || '';
    this.webhookUrl = process.env.WEBHOOK_URL || '';
    this.webhookEvents = process.env.WEBHOOK_EVENT?.split(",") || [];
  }

  private validateConfig() {
    if (!this.baseUrl || !this.apiKey) {
      throw new Error('External service configuration is invalid');
    }
  }

  public async createInstance(name: string): Promise<any> {
    this.validateConfig();
    console.log(`Base URL: ${this.baseUrl}`);
    const response = await fetch(`${this.baseUrl}/instance/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': this.apiKey,
      },
      body: JSON.stringify({
        instanceName: name,
        qrcode: true,
        integration: "WHATSAPP-BAILEYS",
        webhook: {
          url: this.webhookUrl,
          byEvents: false,
          base64: true,
          events: ["MESSAGES_UPSERT"],
        },
        websocket: {
          byEvents: false,
          base64: true,
          events: this.webhookEvents,
        }
      })
    });

    if (!response.ok) {
      console.error('Error making external request:', response.statusText);
      return await response.json();
    }

    return await response.json();
  }

  public async deleteInstance(name: string): Promise<any> {
    this.validateConfig();
    try {
      // Verifica se o nome da instância não está vazio ou nulo
      if (!name) {
        throw new Error('Nome da instância não pode ser vazio ou nulo');
      }

      const response = await fetch(`${this.baseUrl}/instance/delete/${name}`, {
        method: 'DELETE',
        headers: {
          'apikey': this.apiKey,
        }
      });
    return await response.json();
    } catch (error) {
      console.error('Error during external service call:', error);
      throw error;
    }
  }
  public async qrCodeInstance(name: string): Promise<any> {
    this.validateConfig();
    try {
      // Verifica se o nome da instância não está vazio ou nulo
      if (!name) {
        throw new Error('Nome da instância não pode ser vazio ou nulo');
      }

      const response = await fetch(`${this.baseUrl}/instance/connect/${name}`, {
        method: 'GET',
        headers: {
          'apikey': this.apiKey,
        }
      });
      if (!response.ok) { 
        console.error('Error making external request:', response.statusText);
        throw new Error('Failed to create instance');
      }
      return await response.json();
    } catch (error) { 
      console.error('Error during external service call:', error);
      throw error;
    }
  }
}

export default new ExternalService();