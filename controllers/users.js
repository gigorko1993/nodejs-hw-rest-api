const jwt = require("jsonwebtoken");
const Users = require("../repository/users");
const { HttpCode } = require("../config/constant");

require("dotenv").config();
const SECRET_KEY = process.env.JWT_SECRET_KEY;

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
        avatarURL: newUser.avatarURL,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await Users.findByEmail(email);
  const isValidUserPassword = await user.isValidPassword(password);

  if (!user || !isValidUserPassword) {
    return res.status(HttpCode.UNAUTORIZED).json({
      status: "error",
      code: HttpCode.UNAUTORIZED,
      message: "Invalid credentials",
    });
  }
  const id = user._id;
  const payload = { id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  await Users.updateToken(id, token);

  return res.status(HttpCode.OK).json({
    status: "succes",
    code: HttpCode.OK,
    date: {
      token,
    },
  });
};

const logout = async (req, res, next) => {
  const id = req.user._id;
  await Users.updateToken(id, null);
  return res.status(HttpCode.NO_CONTENT).json();
};

const currentUser = async (req, res, next) => {
  try {
    const { email, subscription, _id } = req.user;
    return res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      data: {
        id: _id,
        email: email,
        subscription: subscription,
      },
    });
  } catch (error) {
    return res.status(HttpCode.UNAUTORIZED).json({
      status: "error",
      code: HttpCode.UNAUTORIZED,
      message: "Not autorizated",
    });
  }
};

const updateSubscription = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const user = await Users.updateUserSubscription(userId, req.body);
    if (user) {
      return res.status(HttpCode.OK).json({
        status: "success",
        code: HttpCode.OK,
        user: {
          id: user.userId,
          email: user.email,
          subscription: user.subscription,
        },
      });
    }
  } catch (error) {
    next(error);
  }
};

const uploadAvatar = async (req, res, next) => {
  const pic = req.file;
  console.log(`pic`, pic);
  return res.status(HttpCode.OK).json({ pic });
};

// try {
//   const userId = req.user._id;

//   const contact = await Contacts.updateContact(
//     req.params.contactId,
//     req.body,
//     userId
//   );
//   if (contact) {
//     return res.status(HttpCode.OK).json({
//       status: "success",
//       code: HttpCode.OK,
//       data: { contact },
//     });
//   }
//   return res.status(HttpCode.FORBIDDEN).json({
//     status: "error",
//     code: HttpCode.FORBIDDEN,
//     message: "Not Found",
//   });
// } catch (error) {
//   next(error);
// }

module.exports = {
  registration,
  login,
  logout,
  currentUser,
  updateSubscription,
  uploadAvatar,
};
