
import { Response } from 'express';
import { AxiosError } from 'axios';

export class ErrorHandler {
  static handleApiError(error: any, res: Response) {
    console.error('API Error:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });

    switch (error.response?.status) {
      case 403:
        return res.status(403).json({
          error: 'Authentication Error',
          details: 'Invalid or missing authentication credentials'
        });
      case 404:
        return res.status(404).json({
          error: 'Resource Not Found',
          details: 'The requested resource was not found'
        });
      case 400:
        return res.status(400).json({
          error: 'Invalid Request',
          details: error.response.data || 'Invalid request parameters'
        });
      default:
        return res.status(error.response?.status || 500).json({
          error: 'API Error',
          details: error.response?.data || error.message
        });
    }
  }
}