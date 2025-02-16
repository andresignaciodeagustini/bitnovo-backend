
import { Request, Response } from 'express';
import { BitnovoService } from '../services/bitnovo.service';
import { OrderUtils } from '../utils/order.utils';
import { ErrorHandler } from '../utils/error.handler'; 
import { CreateOrderRequest } from '../interfaces/bitnovo.interfaces';

export class PaymentController {
  static async getCurrencies(req: Request, res: Response) {
    try {
      console.log('[getCurrencies] Fetching available currencies...');
      const currencies = await BitnovoService.getCurrencies();
      console.log('[getCurrencies] Success:', currencies);
      res.json(currencies);
    } catch (error) {
      console.error('[getCurrencies] Error:', error);
      ErrorHandler.handleApiError(error, res);
    }
  }

  static async createOrder(req: Request, res: Response) {
    try {
      const orderData: CreateOrderRequest = req.body;

      if (!OrderUtils.validateAmount(orderData.expected_output_amount)) {
        return res.status(400).json({
          error: 'Invalid Amount',
          details: 'expected_output_amount must be a positive number'
        });
      }

      const formData = OrderUtils.prepareFormData(orderData);
      const order = await BitnovoService.createOrder(formData);
      
      const requiresTag = OrderUtils.requiresTagMemo(orderData.input_currency);
      const response = OrderUtils.formatOrderResponse(order, requiresTag);

      console.log('[createOrder] Success:', response);
      res.json(response);
    } catch (error) {
      console.error('[createOrder] Error:', error);
      ErrorHandler.handleApiError(error, res);
    }
  }

  static async getOrderInfo(req: Request, res: Response) {
    try {
      const { identifier } = req.params;
      console.log(`[getOrderInfo] Fetching info for order: ${identifier}`);

      if (!identifier) {
        return res.status(400).json({
          error: 'Missing Identifier',
          details: 'Order identifier is required'
        });
      }

      const orderInfo = await BitnovoService.getOrderInfo(identifier);
      console.log('[getOrderInfo] Success:', orderInfo);
      res.json(orderInfo);
    } catch (error) {
      console.error('[getOrderInfo] Error:', error);
      ErrorHandler.handleApiError(error, res);
    }
  }

  static async getOrders(req: Request, res: Response) {
    try {
      const { start, end } = req.query as { start?: string; end?: string };
      console.log(`[getOrders] Fetching orders${start && end ? ` from ${start} to ${end}` : ''}`);

      const orders = await BitnovoService.getOrders(start, end);
      console.log(`[getOrders] Retrieved ${orders.length} orders`);
      res.json(orders);
    } catch (error) {
      console.error('[getOrders] Error:', error);
      ErrorHandler.handleApiError(error, res);
    }
  }

  static getWebSocketUrl(identifier: string): string {
    return BitnovoService.getWebSocketUrl(identifier);
  }
}