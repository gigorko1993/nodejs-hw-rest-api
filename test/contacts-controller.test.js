const { updateContact } = require("../controllers/contacts");
const Contacts = require("../repository/contacts");

jest.mock("../repository/contacts");

describe("Unit test controller updateContact", () => {
  const req = { params: { id: 2 }, body: {}, user: { _id: 1 } };
  const res = {};
  const next = jest.fn();

  it("Contact exist", () => {
    const result = updateContact(req, res, next);
  });

  it("Contact does not exist", () => {});
});
