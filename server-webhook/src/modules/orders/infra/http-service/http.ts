import axios, { AxiosResponse } from "axios";

export class HttpService {
  private baseUrl: string;

  constructor(baseUrl: string = 'http://localhost:3002/register') {
    this.baseUrl = baseUrl;
  }

  async post(params: any): Promise<string> {
    console.log('Sending data to', this.baseUrl);
    try {
      const { data } = await axios.post(this.baseUrl, params);
      console.log('Data sent:', data);
      return data.message;
    } catch (error) {
      console.error('Error sending data:', error);
      throw error;
    }
  }
}
