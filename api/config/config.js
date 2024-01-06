module.exports = {
  PORT: process.env.PORT || 5001,
  MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost:27017',
  PAS_SEC: process.env.PAS_SEC || 'dmkur',

  JWT_SEC: process.env.JWT_SEC || 'dmkur',
  ACCESS_TOKEN_LIFETIME: process.env.ACCESS_TOKEN_LIFETIME || '1d',

  ACCESS_SECRET_WORD: process.env.ACCESS_SECRET_WORD || 'word1',
  REFRESH_SECRET_WORD: process.env.REFRESH_SECRET_WORD || 'word2',
  REFRESH_TOKEN_LIFETIME: process.env.REFRESH_TOKEN_LIFETIME || '3d',

  STRIPE_KEY: process.env.STRIPE_KEY || 'dmkur',
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY || 'dmkur',
};
