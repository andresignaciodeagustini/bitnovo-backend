
export interface CryptoCurrency {
    symbol: string;
    name: string;
    min_amount: string;
    max_amount: string;
    image: string;
    blockchain: string;
  }
  
  export interface BitnovoOrder {
    identifier: string;
    reference?: string;
    payment_uri?: string;
    web_url: string;
    address?: string;
    tag_memo?: string;
    input_currency?: string;
    expected_input_amount?: number;
    rate?: number;
    notes: string;
    fiat: string;
    language: string;
    created_at?: string;
    edited_at?: string;
    status?: 'NR' | 'PE' | 'AC' | 'IA' | 'CO' | 'CA' | 'EX' | 'OC' | 'RF' | 'FA' | 'DE' | 'CM';
    fiat_amount?: number;
    crypto_amount?: number;
    merchant_device?: string;
    expired_time?: string;
  }
  
  export interface CreateOrderRequest {
    expected_output_amount: number;
    input_currency: string;
    notes: string;
    merchant_urlko?: string;
    merchant_urlok?: string;
    merchant_url_standby?: string;
    reference?: string;
    fiat?: string;
    language?: string;
    home_address?: string;
    address_additional?: string;
    email_client?: string;
    full_name?: string;
    address_number?: string;
    zip_code?: string;
    city?: string;
    province?: string;
    country?: string;
    phone_number?: string;
    nif?: string;
    internal_data?: string;
  }