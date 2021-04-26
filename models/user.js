const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 3,
		maxlength: 13,
	},

	mobile: {
		type: String,
		required: true,
		unique: true,
		validate(value) {
			if (!validator.isMobilePhone(value, "he-IL")) {
				throw new Error("Invalid phone number");
			}
		},
	},
	password: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		unique: true,
		validate(value) {
			if (!validator.isEmail(value)) {
				throw new Error("Invalid email.");
			}
		},
	},
	token: {
		type: String,
	},
});

userSchema.methods.generateAuthToken = async function () {
	const user = this;
	const token = jwt.sign({ _id: user._id.toString() }, "banksecret");
	user.token = token;
	await user.save();
	return token;
};
userSchema.statics.findByCredentials = async (email, password) => {
	const user = await User.findOne({ email });
	if (!user) {
		throw new Error("unable to login");
	}
	const isMatch = await bcrypt.compare(password, user.password);
	if (!isMatch) {
		throw new Error("unable to login");
	}
	return user;
};

userSchema.pre("save", async function (next) {
	const user = this;
	if (user.isModified()) user.password = await bcrypt.hash(user.password, 8);
	console.log(user);
	next();
});
const User = mongoose.model("Client", userSchema);

module.exports = User;
