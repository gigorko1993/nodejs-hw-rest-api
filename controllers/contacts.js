const Contacts = require("../repository/contacts");
const { CustomError } = require("../helpers/customError");
const { HttpCode } = require("../config/constant");

const getContacts = async (req, res, next) => {
  const userId = req.user._id;
  const data = await Contacts.listContacts(userId, req.query);
  res.json({ status: "success", code: HttpCode.OK, data: { ...data } });
};

const getContact = async (req, res, next) => {
  const userId = req.user._id;
  const contact = await Contacts.getContactById(req.params.contactId, userId);
  if (contact) {
    return res
      .status(HttpCode.OK)
      .json({ status: "success", code: HttpCode.OK, data: { contact } });
  }
  throw new CustomError(HttpCode.FORBIDDEN, "Not found");
};

const createContact = async (req, res, next) => {
  const userId = req.user._id;
  const contact = await Contacts.addContact({ ...req.body, owner: userId });
  res
    .status(HttpCode.CREATED)
    .json({ status: "success", code: HttpCode.CREATED, data: { contact } });
};

const deleteContact = async (req, res, next) => {
  const userId = req.user._id;
  const contact = await Contacts.removeContact(req.params.contactId, userId);
  if (contact) {
    return res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      message: "contact deleted",
    });
  }
  return res.status(HttpCode.FORBIDDEN).json({
    status: "error",
    code: HttpCode.FORBIDDEN,
    message: "Not Found",
  });
};

const updateContact = async (req, res, next) => {
  const userId = req.user._id;
  const contact = await Contacts.updateContact(
    req.params.contactId,
    req.body,
    userId
  );
  if (contact) {
    return res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      data: { contact },
    });
  }
  return res.status(HttpCode.FORBIDDEN).json({
    status: "error",
    code: HttpCode.FORBIDDEN,
    message: "Not Found",
  });
};

const updateFavoriteContact = async (req, res, next) => {
  const userId = req.user._id;

  const contact = await Contacts.updateContact(
    req.params.contactId,
    req.body,
    userId
  );
  if (contact) {
    return res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      data: { contact },
    });
  }
  return res.status(HttpCode.FORBIDDEN).json({
    status: "error",
    code: HttpCode.FORBIDDEN,
    message: "Not Found",
  });
};

module.exports = {
  updateFavoriteContact,
  updateContact,
  deleteContact,
  getContacts,
  getContact,
  createContact,
};
