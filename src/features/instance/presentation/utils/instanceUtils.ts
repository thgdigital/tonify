import fetch from 'node-fetch';

class ExternalService {
  private baseUrl: string;
  private apiKey: string;
  private webhookUrl: string;

  constructor() {
    this.baseUrl = process.env.EVOLUTION_BASE_URL || '';
    this.apiKey = process.env.EVOLUTION_API_KEY || '';
    this.webhookUrl = process.env.EVOLUTION_WEBHOOK_URL || '';
  }

  private validateConfig() {
    if (!this.baseUrl || !this.apiKey) {
      throw new Error('External service configuration is invalid');
    }
  }

  public async createInstance(data: any): Promise<any> {
    this.validateConfig();

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
      throw new Error('Failed to create instance');
    }

    return await response.json();
  }
}

export default new ExternalService();