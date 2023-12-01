const validator = require("../helpers/validate");

const saveRestaurant = (req, res, next) => {
	const validationRule = {
		restaurantName: "required|string",
		streetAddress: "required|string",
		city: "required|string",
		state: "required|string",
		country: "required|string",
		zipCode: "required|string",
		phoneNumber: "required|string",
		email: "required|email",
	};
	validator(req.body, validationRule, {}, (err, status) => {
		if (!status) {
			res.status(412).send({
				success: false,
				message: "Validation failed",
				data: err,
			});
		} else {
			next();
		}
	});
};

const saveClient = (req, res, next) => {
	const validationRule = {
		firstName: "required|string",
		lastName: "required|string",
		birthday: "required|string",
		phoneNumber: "required|string",
		email: "required|string",
	};
	validator(req.body, validationRule, {}, (err, status) => {
		if (!status) {
			res.status(412).send({
				success: false,
				message: "Validation failed",
				data: err,
			});
		} else {
			next();
		}
	});
};

const saveOrder = (req, res, next) => {
	const validationRule = {
		clientName: "required|string",
		price: "required|numeric",
		tableNumber: "required|numeric",
		staffName: "required|string",
		date: "required|date",
		orderStatus: "required|string",
	};
	validator(req.body, validationRule, {}, (err, status) => {
		if (!status) {
			res.status(412).send({
				success: false,
				message: "Validation failed",
				data: err,
			});
		} else {
			next();
		}
	});
};

const saveStaff = (req, res, next) => {
	const validationRule = {
		firstName: "required|string",
		lastName: "required|string",
		birthday: "required|string",
		email: "required|email",
		phoneNumber: "required|string",
		jobPosition: "required|string",
		active: "required|boolean",
		restaurantName: "required|string"
	};
	validator(req.body, validationRule, {}, (err, status) => {
		if (!status) {
			res.status(412).send({
				success: false,
				message: "Validation failed",
				data: err,
			});
		} else {
			next();
		}
	});
};

const saveMenu = (req, res, next) => {
  const validationRule = {
    foodName: 'required|string',
    category: 'required|string',
    price: 'required|numeric',
    description: 'required|string',
    stock: 'required|numeric'
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
	saveOrder,
	saveClient,
	saveStaff,
  saveMenu
};
