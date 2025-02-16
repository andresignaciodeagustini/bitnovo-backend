
import axios, { AxiosResponse } from 'axios';
import { config } from '../config/config';
import { CryptoCurrency, BitnovoOrder } from '../interfaces/bitnovo.interfaces';
import FormData from 'form-data';

const api = axios.create({
  baseURL: config.bitnovoApiUrl,
  headers: {
    'X-Device-Id': config.deviceId
  },
  timeout: 15000
});

export class BitnovoService {
  static async getCurrencies(): Promise<CryptoCurrency[]> {
    const response = await api.get<CryptoCurrency[]>('/currencies');
    return response.data;
  }

  static async createOrder(formData: FormData): Promise<BitnovoOrder> {
    const response = await api.post<BitnovoOrder>('/orders/', formData, {
      headers: {
        ...formData.getHeaders(), 
        'X-Device-Id': config.deviceId
      }
    });
    return response.data;
  }

  static async getOrderInfo(identifier: string): Promise<BitnovoOrder> {
    const response = await api.get<BitnovoOrder>(`/orders/info/${identifier}`);
    return response.data;
  }

  static async getOrders(start?: string, end?: string): Promise<BitnovoOrder[]> {
    let url = '/orders';
    if (start && end) {
      url += `?start=${start}&end=${end}`;
    }
    const response = await api.get<BitnovoOrder[]>(url);
    return response.data;
  }

  static getWebSocketUrl(identifier: string): string {
    return `wss://payments.pre-bnvo.com/ws/${identifier}`;
  }
}