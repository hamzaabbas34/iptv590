const express = require("express");
const mongoose = require("mongoose");
const User = require("./user");
const cors = require("cors");

// Connect to MongoDB
mongoose
	.connect("mongodb://127.0.0.1:27017/fareeq", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("Connected to DB"))
	.catch((err) => console.error("Error connecting to MongoDB:", err));

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
	res.send("Hey, I am here");
});

app.post("/add", async (req, res) => {
	const { name, phoneNumber } = req.body;
	console.log(name, phoneNumber, "this ");
	if (!name || !phoneNumber) {
		return res.status(400).send({ message: "Missing name or phone number" });
	}
	try {
		const user = await User.create({ name, phoneNumber });
		res.status(200).json({ user: user });
	} catch (error) {
		res.status(500).send({ message: "Error creating user", error });
	}
});

app.get("/users", async (req, res) => {
	try {
		const users = await User.find({});
		res.status(200).json({ users: users });
	} catch (error) {
		res.status(500).send({ message: "Error retrieving users", error });
	}
});

// Start the server
app.listen(3001, () => {
	console.log("Server is running on port 3001");
});
