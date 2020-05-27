const Product = require('../models/product');

const setProductValues = async (product, values) => {
  if (values.name) {
    product.name = values.name;
  }
  if (values.description) {
    product.description = values.description;
  }
  if (values.price) {
    product.price = parseInt(values.price);
  }
};

/**
 * Create a new Product
 * @param {object} itemInfo - fields that need to be created
 * */
const create = async (productInfo) => {
  const product = new Product();
  await setProductValues(product, productInfo);
  await product.save();

  return product;
};

/**
 * Gets all Products from the database
 * */
const getAll = async () => {
  return await Product.find();
};

/**
 * Get a specific Product from the database
 * @param {string} id
 * */
const getById = async (id) => {
  const product = await Product.findById(id);

  if (!product) {
    throw new Error('Parking zone not found');
  }

  return product;
};


/**
 * Edit a specific Product from the database based on its ID
 * @param {string} id
 * @param {object} ProductInfo - fields that need to be updated
 * */

const edit = async (id, productInfo, app) => {
  const product = await getById(id);
  await setProductValues(product, productInfo, app);
  await product.save();

  return product;
};


/**
 * Deletes a specific Product from the database
 * @param {string} id
 * */
const deleteById = async (id) => {
  await Product.deleteOne({_id: id});
};

module.exports = {
  create,
  getAll,
  getById,
  edit,
  deleteById,
};
