import { STATUS_CODES, MESSAGES } from "../constants.js";
import env from "dotenv";
import crypto from "crypto";
import getRazorpayInstance from "../config/razorpay.config.js";
import { AppError, handleRazorpayError } from '../middleware/errorHandling.js';


const razorpayInstance = getRazorpayInstance();
env.config();

export const createOrder = async (req, res, next) => {
    const { courseId, amount } = req.body;
    
    // Check if courseId and amount are provided
    if (!courseId || !amount) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({
        message: 'Missing required fields: courseId and/or amount',
      });
    }
  
    const options = {
      amount: amount * 100,
      currency: 'INR',
      receipt: `order_rcptid_${courseId}`,
    };
  
    try {
      const order = await razorpayInstance.orders.create(options);
      return res.status(STATUS_CODES.CREATED).json({
        message: MESSAGES.SUCCESS.ORDER_CREATED,
        order,
      });
    } catch (error) {
      next(handleRazorpayError(error));
    }
  };

const verifySignature = (paymentId, orderId, signature) => {
  const secret = process.env.RAZORPAY_KEY_SECRET;
  const generatedSignature = crypto
    .createHmac("sha256", secret)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");

  return generatedSignature === signature;
};

export const capturePayment = async (req, res, next) => {
  const { orderId, paymentId, signature } = req.body;

  // Verify the payment signature
  if (!verifySignature(paymentId, orderId, signature)) {
    return res.status(STATUS_CODES.FORBIDDEN).json({
      message: "Signature verification failed.",
    });
  }

  try {
    const response = await razorpayInstance.payments.capture(
      paymentId,
      orderId
    );
    return res.status(STATUS_CODES.SUCCESS).json({
      message: "Payment captured successfully",
      response,
    });
  } catch (error) {
    next(handleRazorpayError(error));
  }
};
