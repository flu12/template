const Users = require('../models/user');
const errors = require('../utils/errors');

/**
 * Get a specific user from the database
 * @param {string} userId
 * */
const getById = async (userId) => {
  const user = await Users.findOne({ _id: userId });

  if (!user) {
    throw new Error(errors.USER_NOT_FOUND);
  }

  return user;
};

/**
 * Edit a specific user from the database based on its ID
 * @param {string} id
 * @param {object} userInfo - fields that need to be updated
 * */
const edit = async (id, userInfo) => {
  const user = await getById(id);

  if (userInfo.email) {
    user.local.email = userInfo.email;
  }
  if (userInfo.country) {
    user.address.country = userInfo.country;
  }
  if (userInfo.county) {
    user.address.county = userInfo.county;
  }
  if (userInfo.city) {
    user.address.city = userInfo.city;
  }
  if (userInfo.street) {
    user.address.street = userInfo.street;
  }
  if (userInfo.houseNumber) {
    user.address.houseNumber = userInfo.houseNumber;
  }
  if (userInfo.flatNumber) {
    user.address.flatNumber = userInfo.flatNumber;
  }
  if (userInfo.scara) {
    user.address.scara = userInfo.scara;
  }
  if (userInfo.apartment) {
    user.address.apartment = userInfo.apartment;
  }
  if (userInfo.postalCode) {
    user.address.postalCode = userInfo.postalCode;
  }

  await user.save();

  return user;
};

const deleteById = async (id) => {
  await Users.deleteOne({ _id: id });
};

module.exports = {
	getById,
  edit,
  deleteById,
};
