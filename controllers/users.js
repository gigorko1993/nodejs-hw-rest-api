const jwt = require("jsonwebtoken");
// const fs = require('fs/promises')
const mkdirp = require("mkdirp");
const path = require("path");
const Users = require("../repository/users");
const UploadService = require("../services/file-upload");
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
  const userId = String(req.user._id);
  const file = req.file;
  const USERS_AVATAR = process.env.USERS_AVATAR;
  const destination = path.join(USERS_AVATAR, userId);
  await mkdirp(destination);
  const uploadService = new UploadService(destination);
  const avatarUrl = await uploadService.save(file, userId);
  await Users.updateAvatar(userId, avatarUrl);
  return res.status(HttpCode.OK).json({
    status: "success",
    code: HttpCode.OK,
    date: {
      avatar: avatarUrl,
    },
  });
};

module.exports = {
  registration,
  login,
  logout,
  currentUser,
  updateSubscription,
  uploadAvatar,
};
