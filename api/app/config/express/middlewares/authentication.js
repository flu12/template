const passport = require('passport');
const formatter = require('../../../utils/responseFormatter');

// Configure passport JWT with custom callback
const passportJWT = (req, res, next) => passport.authenticate(
  'jwt',
  { session: false },
  (error, user) => {


    // check for unpredicted errors
  if (error) return next(error);

  // unauthorised users credentials
  if (!user) return formatter(res, {}, 400, 'Unauthorised');

  // set userinfo on the req and pass it to routes/controllers
  req.user = user;

  next();
});

/**
 * Every http request is checked if authentication needed
 * 'authentication not needed' = when request is mentioned in the PUBLIC_PATH
 * If the incoming request is not included in PUBLIC_PATH, it must have valid authentication headers
 * */
const authentication = async (req, res, next) => {
  const { url, method, headers } = req;
  const isAuthRequired = !!headers.authorization;
  const isAPIrequest = url.includes('/api');

  if (
    !isAuthRequired
    || !isAPIrequest
    || method === 'OPTIONS' //CORS check: Before POST/PUT/DELETE send OPTIONS for handshake
  ){
    next();
  }
  else {
    // Check if request has necessary headers
    passportJWT(req, res, next)(req, res, next);
  }
};

module.exports = authentication;
