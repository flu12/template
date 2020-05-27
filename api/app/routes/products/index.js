const router = require('express-promise-router')();
const spacesController = require('../../controllers/products');
const validationSchema = require('./validation');
const validate = require('../../utils/requestValidator');

const getRoute = (app) => {
	const path = "/products";

	router.route('/')
		.get(spacesController.getAll)
		.post(
			validate({ body: validationSchema.save }),
      (req, res) => spacesController.create(req, res, app),
		);

	router.route('/:id')
		.get(spacesController.getById)
		.put(
			validate({ body: validationSchema.save }),
      (req, res) => spacesController.edit(req, res, app),
		)
		.delete(spacesController.deleteById);

  return {
		router,
		path,
	};
};

module.exports = getRoute;
