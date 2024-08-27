export const STATUS_CODES = {
    SUCCESS: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
};

export const MESSAGES = {
    SUCCESS: {
        ORDER_CREATED: "Order has been created successfully.",
        USER_REGISTERED: "User has been registered successfully.",
        // Add other success messages here
    },
    ERROR: {
        INTERNAL_SERVER_ERROR: "Something went very wrong!",
        VALIDATION_ERROR: "Validation failed.",
        // Add other error messages here
    },
};
