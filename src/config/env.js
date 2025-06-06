const config = {
  PORT: process.env.PORT || 3000,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  CHATGPT_API_URL:
    process.env.CHATGPT_API_URL || "https://api.openai.com/v1/chat/completions",
  RATE_LIMIT: process.env.RATE_LIMIT || 100, // Default rate limit
  DB_CONNECTION_STRING: process.env.DB_CONNECTION_STRING,
};

module.exports = config;
