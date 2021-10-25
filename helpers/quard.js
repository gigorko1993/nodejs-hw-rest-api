const passport = require("passport");
require("../config/passport");

const { HttpCode } = require("../config/constant");

const quard = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    const token = req.get("Authorization")?.split(" ")[1];
    if (!user || err || token !== user.token) {
      return res.status(HttpCode.UNAUTORIZED).json({
        status: "error",
        code: HttpCode.UNAUTORIZED,
        message: "Invalid credentials",
      });
    }
    req.user = user;
    return next();
  })(req, res, next);
};

module.exports = quard;
