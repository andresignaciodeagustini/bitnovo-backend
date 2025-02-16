
import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 4000,
  deviceId: process.env.X_DEVICE_ID || '6dfb40b2-246d-4f50-8634-7c572997d315',
  bitnovoApiUrl: process.env.BITNOVO_API_URL || 'https://payments.pre-bnvo.com/api/v1',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
  nodeEnv: process.env.NODE_ENV || 'development'
};

const requiredEnvVars = ['X_DEVICE_ID'];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  throw new Error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
}