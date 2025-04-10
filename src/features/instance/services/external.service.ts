import { api } from "@/igniter.client";
import { PrismaClient } from "@prisma/client";

class ExternalService {
  private baseUrl: string;
  private apiKey: string;

  constructor() {
    this.baseUrl = process.env.EVOLUTION_BASE_URL || '';
    this.apiKey = process.env.EVOLUTION_API_KEY || '';
  }

  private validateConfig() {
    if (!this.baseUrl || !this.apiKey) {
      throw new Error('External service configuration is invalid');
    }
  }

  public async createInstance(data: any): Promise<any> {
    this.validateConfig();
    console.log(`Base URL: ${this.baseUrl}`);
    const response = await fetch(`${this.baseUrl}/instance/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': this.apiKey,
      },
      body: JSON.stringify(data),
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