const formatter = function (response, responseBody, code, error) {
  responseBody.success = !error;

  if (error) {
    // could catch error objects not only strings
    responseBody.error = error.message ? error.message : error;
  }

  return response.status(code)
    .json(responseBody)

};

module.exports = formatter;
