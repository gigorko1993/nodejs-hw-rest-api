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

const {
  validateContact,
  validateId,
  validateUpdateContact,
  validateFavoriteStatus,
} = require("./validation");

router.get("/", quard, getContacts);

router.get("/:contactId", quard, validateId, getContact);

router.post("/", quard, validateContact, createContact);

router.delete("/:contactId", quard, validateId, deleteContact);

router.put(
  "/:contactId",
  quard,
  [(validateId, validateUpdateContact)],
  updateContact
);

router.patch(
  "/:contactId/favorite/",
  quard,
  [validateId, validateFavoriteStatus],
  updateFavoriteContact
);

module.exports = router;
