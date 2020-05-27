const mongoose = require("mongoose");
const {findNotDeletedMiddleware} = require('../utils/mongoose');

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 250
    },
    description: {
      type: String,
      minLength: 2,
      maxLength: 5000
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
	{
		timestamps: true
	},
);

/**
 * Exclude deleted doc's from every query
 * */
ProductSchema.pre('find', findNotDeletedMiddleware);
ProductSchema.pre('findOne', findNotDeletedMiddleware);
ProductSchema.pre('findOneAndUpdate', findNotDeletedMiddleware);
ProductSchema.pre('count', findNotDeletedMiddleware);

const Product = mongoose.model("space", ProductSchema);

module.exports = Product;
