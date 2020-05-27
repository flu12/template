const router = require('express-promise-router')();
const usersController = require('../../controllers/users');
const validationSchema = require('./validation');
const validate = require('../../utils/requestValidator');

const getRoute = (app) => {
  const path = "/admin/users";

  router.route('/:id')
    .get(usersController.getById)
    .put(
      validate({ body: validationSchema.edit }),
      usersController.edit,
    )
    .delete(usersController.deleteById);


  return {
    router,
    path,
  };
};

module.exports = getRoute;
