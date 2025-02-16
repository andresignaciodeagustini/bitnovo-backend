import express from 'express';
import cors from 'cors';
import multer from 'multer';
import paymentRoutes from '../src/routes/payment.routes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const upload = multer();

const allowedOrigins = [
  'https://bitnovo-frontend.vercel.app',
  'http://localhost:3000'
];


if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL);
}

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(upload.none()); 

app.use('/api', paymentRoutes);

if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`API URL: ${process.env.BITNOVO_API_URL || 'https://payments.pre-bnvo.com/api/v1'}`);
  });
}

export default app;