const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const helmet = require("helmet");

const contactsRouter = require("./routes/contacts/contacts");
const usersRouter = require("./routes/users/users");
const { HttpCode } = require("./config/constant");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(helmet());
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json({ limit: 10000 }));

app.use("/api/users", usersRouter);
app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res
    .status(HttpCode.FORBIDDEN)
    .json({ status: "error", code: HttpCode.FORBIDDEN, message: "Not found" });
});

app.use((err, req, res, next) => {
  res
    .status(HttpCode.INTERNAL_SERVER_ERROR)
    .json({
      status: "fail",
      code: HttpCode.INTERNAL_SERVER_ERROR,
      message: err.message,
    });
});

module.exports = app;
