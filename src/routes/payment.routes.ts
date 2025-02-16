
import { Router, Request, Response, NextFunction } from 'express';
import { PaymentController } from '../controllers/payment.controller';

const router = Router();


const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

router.get(
  '/currencies', 
  asyncHandler((req: Request, res: Response) => PaymentController.getCurrencies(req, res))
);

router.post(
  '/orders', 
  asyncHandler((req: Request, res: Response) => PaymentController.createOrder(req, res))
);

router.get(
  '/orders/info/:identifier', 
  asyncHandler((req: Request, res: Response) => PaymentController.getOrderInfo(req, res))
);

router.get(
  '/orders', 
  asyncHandler((req: Request, res: Response) => PaymentController.getOrders(req, res))
);

export default router;