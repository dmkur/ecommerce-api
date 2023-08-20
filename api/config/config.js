module.exports = {
  PORT: process.env.PORT || 5001,
  MONGO_URL: process.env.MONGO_URL || 'localhost:2700',
  PAS_SEC: process.env.PAS_SEC || 'dmkur',

  JWT_SEC: process.env.JWT_SEC || 'dmkur',
  ACCESS_TOKEN_LIFETIME: process.env.ACCESS_TOKEN_LIFETIME || '3d',

  STRIPE_KEY: process.env.STRIPE_KEY || 'dmkur',
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY || 'dmkur',
};
