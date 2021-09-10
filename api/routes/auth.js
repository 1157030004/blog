const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

router.post("/register", async (req, res) => {
	const { username, email, password } = req.body;

	try {
		const salt = await bcrypt.genSalt(10);
		const hashedPass = await bcrypt.hash(password, salt);
		const newUser = new User({
			username,
			email,
			password: hashedPass,
		});

		const user = await newUser.save();
		res.status(200).json(user);
	} catch (e) {
		res.status(500).json(e.message);
	}
});

router.post("/login", async (req, res) => {
	try {
		const user = await User.findOne({
			username: req.body.username,
		});
		!user && res.status(400).json("Wrong credentials!");

		const validated = await bcrypt.compare(req.body.password, user.password);
		!validated && res.status(400).json("Wrong credentials!");

		// const { password, ...others } = user._doc;
		const { password } = user._doc;
		res.status(200).json(user._doc);
	} catch (e) {
		res.status(500).json(e.message);
	}
});

module.exports = router;
