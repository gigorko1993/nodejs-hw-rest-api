const { updateContact } = require("../controllers/contacts");
const Contact = require("../repository/contacts");

jest.mock("../repository/contacts");

describe("Unit test controller updateContact", () => {
  const req = { params: { id: 2 }, body: {}, user: { _id: 1 } };
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn((data) => data),
  };
  const next = jest.fn();

  beforeEach(() => {
    Contact.updateContact = jest.fn();
  });

  it("Contact exist", async () => {
    const contact = { id: 2, name: "ddd" };
    Contact.updateContact = jest.fn(() => {
      return contact;
    });
    const result = await updateContact(req, res, next);
    expect(result).toBeDefined();
    expect(result).toHaveProperty("status");
    expect(result).toHaveProperty("code");
    expect(result).toHaveProperty("data");
    expect(result.data.contact).toEqual(contact);
  });

  it("Contact does not exist", async () => {
    await expect(updateContact(req, res, next)).rejects.toEqual({
      message: "Not Found",
    });
  });
});
