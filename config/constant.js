const ValidContactName = {
  MIN_NAME_LENGTH: 1,
};

const Subscription = {
  START: "starter",
  PRO: "pro",
  BUSINESS: "business",
};

const HttpCode = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTORIZED: 401,
  FORBIDDEN: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

module.exports = {
  ValidContactName,
  Subscription,
  HttpCode,
};
