const express = require("express");
const router = express.Router();
const quard = require("../../helpers/quard");

const { registration, login, logout } = require("../../controllers/users");

router.post("/signup", registration);
router.post("/login", login);
router.post("/logout", quard, logout);

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
