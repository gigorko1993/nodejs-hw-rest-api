const express = require("express");
const router = express.Router();

const { registration, login, logout } = require("../../controllers/users");

router.post("/registration", registration);
router.post("/login", login);
router.post("/logout", logout);

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
