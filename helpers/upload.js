const multer = require("multer");
require("dotenv").config();
const { CustomErr, CustomError } = require("../helpers/customError");
const { HttpCode } = require("../config/constant");
const UPLOAD_DIR = process.env.UPLOAD_DIR;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now().toString()}_${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 2000000 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.includes("image")) {
      return cb(null, true);
    }
    cb(new CustomError(HttpCode.BAD_REQUEST, "Wrong avatar format"));
  },
});

module.exports = upload;
