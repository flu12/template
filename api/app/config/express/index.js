const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const path = require('path');
const routes = require('../../routes');
// const authenticationMiddleware = require('./middlewares/authentication');
const reqBodyValidatorMiddleware = require('./middlewares/reqBodyValidator');

const init = (app, cb) => {
  app.use(cors());                                  // allow cross origin requests
  /* Define middlewares */
  app.use(bodyParser.urlencoded({extended: true})); // extract URL params from request
  app.use(bodyParser.json({limit: '50mb'}));        // extract json body from request

  // app.use(authenticationMiddleware);

  /* Define available routes, prefix them with '/api' */
  routes.forEach((getRoute) => {
    const {router, path} = getRoute(app);

    app.use(`/api${path}`, router);
  });

  /* Error handler for validation errors */
  app.use(reqBodyValidatorMiddleware);

  app.use(express.static(path.join(__dirname, '../../build-ui')));

  // Handles any requests that don't match the ones above
  app.get('/*', express.static(path.join(__dirname, '../../build-ui/index.html')));

  cb(null);
};

module.exports = {
  init,
};
