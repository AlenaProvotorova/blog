const { Sequelize } = require("sequelize");
require("dotenv").config();
const messages = require("../helpers/hashmap");

const sequelize = new Sequelize("blog", "postgres", "72511", {
  host: process.env.SQ_HOST,
  dialect: process.env.SQ_DIALECT,
  port: process.env.SQ_PORT,
});

sequelize
  .authenticate()

  .then(() => console.log(messages.sequilizeConnectionSuccsess))

  .catch((err) => console.error(messages.sequilizeConnectionError, err));

module.exports = sequelize;
