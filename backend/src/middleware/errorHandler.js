/**
 * Middleware to handle 404 Not Found routes.
 */
export const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

/**
 * Global error handling middleware.
 * Ensures all errors are formatted consistently for API clients.
 */
export const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

  res.status(statusCode);

  const response = {
    message: err.message || "Internal Server Error"
  };

  if (process.env.NODE_ENV !== "production") {
    response.stack = err.stack;
  }

  console.error(err);

  res.json(response);
};


