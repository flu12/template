const User = require('../models/user');
const formatter = require('../utils/responseFormatter');
const authService = require('../services/auth');

/**
 * Generate JWT token based on user info transmitted by passport on req
 * @return {string} JWT token
 * */
const login = async (req, res, app) => {
  try {
    const token = await authService.login(req.user, req.body.loginCode, app);

    formatter(res, { token, user: req.user }, 200);

    const { _id } = req.user;
    const lastLogin = new Date();

    await User.findOneAndUpdate({ _id }, { $set: { lastLogin } });
  }
  catch (error) {
    formatter(res, {}, 500, error);
  }
};

/**
 * Creates a new user entity managed via local auth implementation (email and password)
 * @return {string} JWT token
 * */
const register = async (req, res, app) => {
  try {
    const user = req.body;
    const newUser = await authService.register(user,app);

    formatter(res, { newUser }, 200);
  }
  catch (error) {
    formatter(res, {}, 500, error);
  }
};

/**
 * Generate user info based on JWT token transmitted by passport on req
 * @return {Object} current logged in user
 * */
const isLoggedIn = async (req, res) => {
  formatter(res, { user: req.user }, 200);

  // update last auth timestamp
  await req.user.update({lastLogin: new Date()});
};

module.exports = {
  login,
  register,
  isLoggedIn,
};
