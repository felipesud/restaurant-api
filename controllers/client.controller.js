const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const getAllClients = async (req, res) => {
	// #swagger.tags=['Clients']
	try {
		const result = await mongodb.getDatabase().db().collection("clients").find();
		result.toArray().then((clients) => {
			res.setHeader("Content-Type", "application/json");
			res.status(200).json(clients);
		});
	} catch (error) {
		console.log(error);
	}
};

const getSingleClient = async (req, res) => {
	// #swagger.tags=['Clients']
	try {
		const clientId = new ObjectId(req.params.id);
		const result = await mongodb.getDatabase().db().collection("clients").find({ _id: clientId });
		result.toArray().then((client) => {
			res.setHeader("Content-Type", "application/json");
			res.status(200).json(client[0]);
		});
	} catch (error) {
		console.log(error);
	}
};

const createClient = async (req, res) => {
	// #swagger.tags=['Clients']
	const client = {
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		birthday: req.body.birthday,
		phoneNumber: req.body.phoneNumber,
		email: req.body.email,
	};

	try {
		const response = await mongodb.getDatabase().db().collection("clients").insertOne(client);
		if (response.acknowledged > 0) {
			res.status(204).send();
		} else {
			res.status(500).json({ message: "Error creating client" });
		}
	} catch (error) {
		console.log("error: ", error);
	}
};

const updateClient = async (req, res) => {
	// #swagger.tags=['Clients']
	const clientId = new ObjectId(req.params.id);
	const client = {
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		birthday: req.body.birthday,
		phoneNumber: req.body.phoneNumber,
		email: req.body.email,
	};

	try {
		const response = await mongodb.getDatabase().db().collection("clients").replaceOne({ _id: clientId }, client);

		if (response.modifiedCount > 0) {
			res.status(204).send();
		} else {
			res.status(500).json(response.error || "some error ocurred while updating the client");
		}
	} catch (error) {
		console.error("Error inserting user:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

const deleteClient = async (req, res) => {
	// #swagger.tags=['Clients']
	try {
		const clientId = new ObjectId(req.params.id);
		const response = await mongodb.getDatabase().db().collection("clients").deleteOne({ _id: clientId });

		if (response.deletedCount > 0) {
			res.status(204).send();
		} else {
			res.status(500).json(response.error || "Some error occurred while deleting client");
		}
	} catch (error) {
		console.error("Error deleting client:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

module.exports = {
	getAllClients,
	getSingleClient,
	createClient,
	updateClient,
	deleteClient,
};
