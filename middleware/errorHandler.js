const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const type = err.name || "Internal Server Error.";
  const message = err.message || "Something went wrong.";

  console.error(`[${type}] ${message}`);

  res.status(status).json({
    error: {
      type,
      message,
    },
  });
};

module.exports = errorHandler;
