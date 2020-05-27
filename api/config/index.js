const development = require('./development');
const production = require('./production');

const createConfig = (module) => ({...module});

module.exports = {
  development: createConfig(development),
  production: createConfig(production),
};
