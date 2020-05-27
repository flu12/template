const mongoose = require('mongoose');
const { USER_ROLES } = require('../../config/constants');

const userRolesEnum = Object.values(USER_ROLES);

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 200,
  },
  lastName: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 200,
  },
  userRoles: {
    type: [
      {
        type: String,
        enum: userRolesEnum,
        default: USER_ROLES.CLIENT,
        // required: true,
      },
    ],
    minLength: 1,
    // required: true,
  },
  local: {
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      maxLength: 50,
    },
  },
  address: {
    country: {
      type: String,
      minLength: 2,
      maxLength: 200,
    },
    county: {
      type: String,
      minLength: 2,
      maxLength: 200,
    },
    city: {
      type: String,
      minLength: 2,
      maxLength: 200,
    },
    street: {
      type: String,
      minLength: 2,
      maxLength: 200,
    },
    houseNumber: {
      type: String,
      minLength: 1,
      maxLength: 50,
    },
    flatNumber: {
      type: String,
      minLength: 1,
      maxLength: 50,
    },
    scara: {
      type: String,
      minLength: 1,
      maxLength: 50,
    },
    apartment: {
      type: String,
      minLength: 1,
      maxLength: 50,
    },
    postalCode: {
      type: String,
      minLength: 2,
      maxLength: 50,
    },
  },
  lastLogin: {
    type: Date,
    required: false,
    default: null,
  },
}, {
  timestamps: true
});

/**
 * Check if users two entities are the same
 * */
UserSchema.methods.validatePassword = function (password) {
  return this.local.password === password;
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
