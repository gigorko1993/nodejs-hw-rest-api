const express = require("express");
const router = express.Router();
const quard = require("../../helpers/quard");
const loginLimit = require("../../helpers/rateLimitLogin");

const {
  registration,
  login,
  logout,
  currentUser,
  updateSubscription,
} = require("../../controllers/users");

router.post("/signup", registration);
router.post("/login", loginLimit, login);
router.post("/logout", quard, logout);
router.get("/current", quard, currentUser);
router.patch("/subscription", quard, updateSubscription);

// const {
//   validateContact,
//   validateId,
//   validateUpdateContact,
//   validateFavoriteStatus,
// } = require("./validation");

// router.patch(
//   "/:contactId/favorite/",
//   [validateId, validateFavoriteStatus],
//   updateFavoriteContact
// );

module.exports = router;
