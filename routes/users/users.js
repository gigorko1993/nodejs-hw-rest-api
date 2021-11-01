const express = require("express");
const router = express.Router();
const quard = require("../../helpers/quard");
const loginLimit = require("../../helpers/rateLimitLogin");
const upload = require("../../helpers/upload");

const {
  registration,
  login,
  logout,
  currentUser,
  updateSubscription,
  uploadAvatar,
  verifyUser,
  repeatEmailVerify,
} = require("../../controllers/users");

const {
  validateUserRegistration,
  validateUserLogin,
  validateUserSubscription,
} = require("./validation");

router.post("/signup", validateUserRegistration, registration);
router.post("/login", loginLimit, validateUserLogin, login);
router.post("/logout", quard, logout);
router.get("/current", quard, currentUser);
router.patch("/avatars", quard, upload.single("avatar"), uploadAvatar);
router.patch(
  "/subscription",
  quard,
  validateUserSubscription,
  updateSubscription
);
router.get("/verify/:verificationToken", verifyUser);
router.post("/verify", repeatEmailVerify);

module.exports = router;
