const {ValidationError} = require('express-json-validator-middleware');

const reqBodyValidator = (err, req, res, next) => {
  // Send HTTP error in case validation fails
  if (err instanceof ValidationError) {
    res
      .status(400)
      .json({
        statusText: 'Bad Request',
        validations: err.validationErrors,
      });
  } else {
    next(err);
  }
};

module.exports = reqBodyValidator;
