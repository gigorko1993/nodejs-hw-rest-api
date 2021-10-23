const Users = require("../repository/users");

const { HttpCode } = require("../config/constant");

const registration = async (req, res, next) => {
  const { email, password, subscription } = req.body;
  const user = await Users.findByEmail(email);
  if (user) {
    return res.status(HttpCode.CONFLICT).json({
      status: "error",
      code: HttpCode.CONFLICT,
      message: "Email is already exist",
    });
  }
  try {
    const newUser = await Users.create({ email, password, subscription });
    return res.status(HttpCode.CREATED).json({
      status: "succes",
      code: HttpCode.CREATED,
      data: {
        id: newUser.id,
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

const login = async (req, res, next) => {
  res.json();
};

const logout = async (req, res, next) => {
  res.json();
};

module.exports = {
  registration,
  login,
  logout,
};
