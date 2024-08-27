import { STATUS_CODES, MESSAGES } from '../constants.js';

class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

const globalErrorHandler = (err, req, res, next) => {
    if (err.isOperational) {
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    }

    console.error('ERROR 💥', err);

    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
        status: 'error',
        message: MESSAGES.ERROR.INTERNAL_SERVER_ERROR,
    });
};

const handleRazorpayError = (error) => {
    if (error.statusCode) {
        return new AppError(`Razorpay Error: ${error.error || "Unknown error"}`, error.statusCode);
    }
    return new AppError(MESSAGES.ERROR.INTERNAL_SERVER_ERROR, STATUS_CODES.INTERNAL_SERVER_ERROR);
};

export { AppError, globalErrorHandler, handleRazorpayError };
