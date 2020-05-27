const User = require('../models/user');
const userService = require('./users');
const { AUTH_METHODS, USER_ROLES, STATUSES, } = require('../../config/constants');
const JWT = require('jsonwebtoken');

/**
 * Utility function that generates a JWT token
 * @param {object} user
 * @return {string} token - JWT token
 * */
const generateUserToken = (user, app) => {
  const {
    APP_NAME,
    JWT_AUTH: {
      TOKEN,
    },
  } = app.get('config');

  return JWT.sign(
    {
      iss: APP_NAME,                                      // issued by
      iat: new Date().getTime(),                          // issued at
      exo: new Date().setDate(new Date().getDate() + 1),  // expires on
      sub: user.id,
    },
    TOKEN, // Sign encode secret
  );
};


/**
 * Generate JWT token based on user info transmitted by passport on req
 * If this is the user's first login, he entered his credentials correct (otherwise the error will be thrown)
 * Also set the user as active
 * @param {object} userInfo
 * @param {string} loginCode
 * @param {object} app
 * @return {string} JWT token
 * */
const login = async (userInfo, loginCode, app) => {
  if(userInfo.loginCode !== loginCode)  {
    throw new Error(`The login code doesn't match`);
  }

  if (!userInfo.isActive) {
    userInfo.isActive = true;
  }

  userInfo.loginCode = null;
  await userInfo.save();

  return generateUserToken(userInfo, app);
};


/**
 * Creates a new user entity managed via local auth implementation (email and password)
 * @param {object} userInfo
 * @param {object} app
 * @return {string} JWT token
 * */
const register = async (userInfo, app) => {
  const {
    firstName,
    lastName,
    email,
    password,
    country,
    county,
    city,
    street,
    houseNumber,
    flatNumber,
    scara,
    apartment,
    postalCode,
    userRoles,
  } = userInfo;
  // Check if there is a user with the same email
  const existingUser = await userService.find({ 'local.email': email });

  if (existingUser && existingUser[0]) {
    throw new Error('Email is already in use');
  }

  const newUser = new User(
    {
      firstName,
      lastName,
      authMethod: AUTH_METHODS.LOCAL,
      userRoles: userRoles || [USER_ROLES.CLIENT],
      local: {
        email,
        password,
      },
      address: {
        country,
        county,
        city,
        street,
        houseNumber,
        flatNumber,
        scara,
        apartment,
        postalCode,
      },
    },
  );

  await newUser.save();

  return newUser;
};

module.exports = {
  login,
  register,
};
