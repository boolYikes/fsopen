require("dotenv").config();

const URI =
  process.env.NODE_ENV === "test" ? process.env.TEST_URI : process.env.URI;

const PORT = process.env.PORT;

module.exports = {
  URI,
  PORT,
};
