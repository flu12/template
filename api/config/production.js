module.exports = {
  APP_NAME: 'template',
  PORT: 8000,
  DATABASE: process.env.MONGODB_URI || 'mongodb://localhost:8092/template',
  JWT_AUTH: {
    TOKEN: 'Some-R@nd0m-TTOOKKEENN'
  },
};
