const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

const signup = async ({
  name,
  email,
  password,
}) => {
  if (!name || !email || !password) {
    throw new Error("All fields are required");
  }

  if (password.length < 6) {
    throw new Error(
      "Password must be at least 6 characters"
    );
  }

  const existingUser = await User.findOne({
    email,
  });

  if (existingUser) {
    throw new Error(
      "User already exists"
    );
  }

  const passwordHash =
    await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    passwordHash,
  });

  const token = generateToken(user._id);

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  };
};

const login = async ({
  email,
  password,
}) => {
  if (!email || !password) {
    throw new Error(
      "Email and password required"
    );
  }

  const user = await User.findOne({
    email,
  });

  if (!user) {
    throw new Error(
      "Invalid credentials"
    );
  }

  const passwordMatch =
    await bcrypt.compare(
      password,
      user.passwordHash
    );

  if (!passwordMatch) {
    throw new Error(
      "Invalid credentials"
    );
  }

  const token = generateToken(user._id);

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  };
};

module.exports = {
  signup,
  login,
};