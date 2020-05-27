/**
* Definition of auth strategies
*/
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const errors = require('../../utils/errors')
const User = require('../../models/user');

let init;
init = (app, cb) => {
  const {
    APP_NAME,
    JWT_AUTH: {
      TOKEN,
    },
  } = app.get('config');

  /**
   * JWT Strategy requires us to specify
   * - where is the token stored on the request
   * - token signing secret, to decode the token
   *
   * It extracts the user information (userId) from the JWT token and offers it on the callback's payload
   * */
  passport.use(
    new JwtStrategy({
        issuer: APP_NAME,
        jwtFromRequest: ExtractJwt.fromHeader('authorization'),
        secretOrKey: TOKEN,
      },
      /**
       * Callback
       * @param {Object} payload - JWT payload; In order to see it's contents @see {/app/controllers/auth/index
       *     generateToken}
       * @param {function} done
       *      - @argument error
       *      - @argument  userInfo
       * */
      async (payload, done) => {
        try {
          // Find the user specified in token
          const userId = payload.sub;

          const user = await User.findById(userId);

          // Check if user exists
          if (!user) return done(null, false, errors.USER_NOT_FOUND);

          // Return user
          done(null, user);
        } catch (error) {
          done(error, false, 'Error extracting JWT token');
        }
      }
      ));

  /**
   * Local Strategy requires us to specify
   * - username and password, assuming these fields require authentication
   * - in case we use another field instead of username, we need to configure LocalStrategy
   *
   * It extracts <<username>> and password from the request body and offers them on the callback's
   * */
  passport.use(
    new LocalStrategy({
        usernameField: 'email',
      },
      async (email, password, done) => {
        try {
          // Find the user, given the email
          const user = await User
            .findOne({'local.email': email})
            .select('+local.password');

          // Check if user exists
          if (!user) return done(null, false, errors.USER_NOT_FOUND);

          const isValidPassword = await user.validatePassword(password);

          if (!isValidPassword) {
            return done(null, false, errors.UNAUTHORIZED);
          }

          // Return user
          // ToDo remove password from user
          done(null, user);
        } catch (error) {
          done(error, false);
        }
      }
    ));
  cb(null);
};

module.exports = {
  init,
};
