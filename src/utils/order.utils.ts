
import FormData from 'form-data';
import { CreateOrderRequest, BitnovoOrder } from '../interfaces/bitnovo.interfaces';
import { config } from '../config/config';

export class OrderUtils {
  private static TAG_MEMO_CURRENCIES = ['XRP_TEST', 'XLM_TEST', 'ALGO_TEST'];

  static validateAmount(amount: number): boolean {
    return !isNaN(amount) && amount > 0;
  }

  static requiresTagMemo(currency: string): boolean {
    return this.TAG_MEMO_CURRENCIES.includes(currency);
  }

  static prepareFormData(orderData: CreateOrderRequest): FormData {
    const formData = new FormData();
    
    formData.append('expected_output_amount', orderData.expected_output_amount.toString());
    formData.append('input_currency', orderData.input_currency);
    formData.append('notes', orderData.notes);
    
    if (orderData.merchant_urlok) {
      formData.append('merchant_urlok', orderData.merchant_urlok.replace(config.frontendUrl, 'paytest.bitnovo.com'));
    }
    if (orderData.merchant_urlko) {
      formData.append('merchant_urlko', orderData.merchant_urlko.replace(config.frontendUrl, 'paytest.bitnovo.com'));
    }
    if (orderData.merchant_url_standby) {
      formData.append('merchant_url_standby', orderData.merchant_url_standby.replace(config.frontendUrl, 'paytest.bitnovo.com'));
    }

    formData.append('fiat', 'EUR');
    formData.append('language', 'ES');

    if (orderData.reference) {
      formData.append('reference', orderData.reference);
    }

    Object.entries(orderData).forEach(([key, value]) => {
      if (value && !['expected_output_amount', 'input_currency', 'notes', 'merchant_urlok', 'merchant_urlko', 'merchant_url_standby', 'reference'].includes(key)) {
        formData.append(key, value.toString());
      }
    });

    return formData;
  }

  static formatOrderResponse(order: BitnovoOrder, requiresTag: boolean) {
    return {
      ...order,
      requires_tag: requiresTag,
      tag_warning: requiresTag ? 
        'IMPORTANT: This cryptocurrency requires the provided TAG/MEMO for the transaction' 
        : undefined
    };
  }
}