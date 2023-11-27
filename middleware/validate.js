const validator = require('../helpers/validate');

const saveRestaurant = (req, res, next) => {
  const validationRule = {
    restaurantName: 'required|string',
    streetAddress: 'required|string',
    city: 'required|string',
    state: 'required|string',
    country: 'required|string',
    zipCode: 'required|string',
    phoneNumber: 'required|string',
    email: 'required|email',
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err,
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveRestaurant,
};
