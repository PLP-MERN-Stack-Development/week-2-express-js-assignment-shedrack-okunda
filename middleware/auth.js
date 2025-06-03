require("dotenv").config();

const authenticate = (req, res, next) => {
  const apiKey = req.headers["x-api-key"];
  const validApiKey = process.env.API_KEY;

  if (apiKey !== validApiKey) {
    return res.status(401).json({ error: "Unauthorized: Invalid API key." });
  }

  next();
};

module.exports = authenticate;
