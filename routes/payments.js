import express from 'express';
import { createOrder, capturePayment } from '../controllers/payment.js';

const router = express.Router();

router.post('/create-order', createOrder);
router.post('/capture-payment', capturePayment);

export default router;
