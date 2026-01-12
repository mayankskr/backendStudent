// Custom error class
export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);               
    this.status = statusCode;
    this.isOperational = true; // Helps avoid server crashes and marks the error expected
    Error.captureStackTrace(this, this.constructor); // To make debugging easier and make stack trace clean and readable
  }
}

// Async error handler 
// Async Wrap
export const asyncWrap = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

