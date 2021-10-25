const { HttpCode } = require("../config/constant");

const quard = (role) => (req, res, next) => {
  const roleUser = req.user.subscription;

  if (roleUser !== role) {
    return res.status(HttpCode.FORBIDDEN).json({
      status: "error",
      code: HttpCode.FORBIDDEN,
      message: "Acces is denied",
    });
  }
  return next();
};

module.exports = quard;
