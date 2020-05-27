const productsService = require('../services/products');
const formatter = require('../utils/responseFormatter');

const create = async (req, res, app) => {
	try {
		await productsService.create(req.body, app);

		formatter(res, {}, 200);
	}
	catch (error) {
		formatter(res, {}, 500, error);
	}
};

const getAll = async (req, res, app) => {
	try {
		const spaces = await productsService.getAll();

		formatter(res, {spaces}, 200);
	}
	catch (error) {
		formatter(res, {}, 500, error);
	}
};

const getById = async (req, res, app) => {
	try {
		const space = await productsService.getById(id);

		formatter(res, {space}, 200);
	}
	catch (error) {
		formatter(res, {}, 500, error);
	}
};

const edit = async (req, res, app) => {
	try {
	 	await productsService.edit(req.params.id, req.body, app);

		formatter(res, {}, 200);
	}
	catch (error) {
		formatter(res, {}, 500, error);
	}
};

const deleteById = async (req, res, app) => {
	try {
		await productsService.deleteById(req.params.id);

		formatter(res, {}, 200);
	}
	catch (error) {
		formatter(res, {}, 500, error);
	}
};

module.exports = {
	create,
	getAll,
	getById,
	edit,
	deleteById,
};
