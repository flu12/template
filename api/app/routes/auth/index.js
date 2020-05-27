/**
 * Defines all available authentication related routes
 */
const router = require('express-promise-router')();
const passport = require('passport');
const validationSchema = require('./validation');
const authController = require('../../controllers/auth');
const validate = require('../../utils/requestValidator');
const formatter = require('../../utils/responseFormatter');

const passportLocal = (req, res, next) => passport.authenticate(
  'local',
  { session: false },
  (err, user, info) => {
    if (err) {
      return formatter(res, {}, 400, err);
    }

    if (info) {
      return formatter(res, {}, 400, info);
    }

    req.user = user;
    next();
  },
)(req, res, next);

const getRoute = (app) => {
  const path = "/auth";

  /**
   * Local implementation of users sign up
   * Requires req.body to contain email and password
   * Exchange the email and password for an auth token, creating a new account
   * */
  router.route('/register')
    .post(
      validate({body: validationSchema.register}),
      (req, res) => authController.register(req, res, app),
    );

  router.route('/confirm')
    .post(
      validate({body: validationSchema.confirm}),
      (req, res) => authController.confirm(req, res, app),
    );

  router.route('/setUserLoginCode')
    .post(
      validate({body: validationSchema.userLoginCode}),
      (req, res, next) => {
        passportLocal(req, res, next);
      },
      (req, res) => authController.setUserLoginCode(req, res, app),
    );

  /**
   * Local implementation of logging in
   * Requires req.body to contain email and password
   * Exchange the email and password for an auth token, without creating a new account
   * */
  router.route('/login')
    .post(
      validate({body: validationSchema.login}),
      (req, res, next) => {
        passportLocal(req, res, next);
      },
      (req, res) => authController.login(req, res, app),
    );

  /**
   * Local implementation to check if users is logged in
   * Exchange the JWT token from req.headers.authorization for the associated users
   * */
  router.route('/is-logged-in')
    .get(
      authController.isLoggedIn,
    );

  /**
   * Forgot password
   * Requires req.body to contain email
   * */
  router.route('/forgot-password')
    .post(
      validate({ body: validationSchema.forgotPassword }),
      (req, res) => {
        authController.forgotPassword(req, res, app);
      },
    );

  return {
    router,
    path,
  };
};

module.exports = getRoute;
