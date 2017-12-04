'use strict';
const validateModel = function(model, data) {
  let error = false;
  Object.keys(model).forEach(key => {
    if (typeof data[key] !== model[key]) {
      error = `Invalid model. ${key} should be of type ${model[key]}`;
    }
  });

  return error;
}

const validateParticipant = function(req, res, next) {
  const model = {
    first_name: 'string',
    last_name: 'string',
    email: 'string'
  }

  const error = validateModel(model, req.body);
  if (error) {
    return res.status(422).json({
      error
    });
  }

  return next();
}

module.exports = {
  validateParticipant
}
