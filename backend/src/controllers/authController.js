const authService = require(
  "../services/authService"
);

const signup = async (
  req,
  res
) => {
  try {
    const result =
      await authService.signup(
        req.body
      );

    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const login = async (
  req,
  res
) => {
  try {
    const result =
      await authService.login(
        req.body
      );

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const getCurrentUser = async (
  req,
  res
) => {
  res.status(200).json({
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
    },
  });
};

module.exports = {
  signup,
  login,
  getCurrentUser,
};