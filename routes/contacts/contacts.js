const express = require("express");
const router = express.Router();
const {
  updateFavoriteContact,
  updateContact,
  deleteContact,
  getContacts,
  getContact,
  createContact,
} = require("../../controllers/contacts");

const quard = require("../../helpers/quard");
const customError = require("../../helpers/errorHandler");

const {
  validateContact,
  validateId,
  validateUpdateContact,
  validateFavoriteStatus,
} = require("./validation");

router.get("/", quard, customError(getContacts));

router.get("/:contactId", quard, validateId, customError(getContact));

router.post("/", quard, validateContact, customError(createContact));

router.delete("/:contactId", quard, validateId, customError(deleteContact));

router.put(
  "/:contactId",
  quard,
  [(validateId, validateUpdateContact)],
  customError(updateContact)
);

router.patch(
  "/:contactId/favorite/",
  quard,
  [validateId, validateFavoriteStatus],
  customError(updateFavoriteContact)
);

module.exports = router;
