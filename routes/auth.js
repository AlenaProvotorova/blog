const express = require("express");
const sequelize = require("../db/sequelize");
const router = express.Router();
const jwt = require("jsonwebtoken");
const loger = require("../middlewars/loger");
require("dotenv").config();
const token = require("../utiles/token");
const helper = require("../helpers/Helper");
const messages = require("../helpers/hashmap");

router.get("/sign-in", loger, async function (req, res) {
  const { email, password } = req.query;
  const users = await sequelize.query("SELECT * FROM users WHERE email = ?", {
    replacements: [email],
    type: sequelize.QueryTypes.SELECT,
  });

  const user = users[0];

  if (user && user.password === password) {
    res.cookie("token", token.createToken(user.email, user.id));
    res.status(200).send({
      message: messages.singInSuccsess,
    });
  } else {
    res.status(401).send({
      message: messages.singInError,
    });
  }
});

router.post("/sign-up", loger, async function (req, res) {
  const users = await sequelize.query("SELECT * FROM users WHERE email = ?", {
    replacements: [req.body.email],
    type: sequelize.QueryTypes.SELECT,
  });

  const user = users[0];
  if (user) {
    res.status(200).send({
      message: messages.singUpErrorUserExist,
    });
  } else {
    const { name, email, password } = req.body;
    const person = await sequelize.query(
      "INSERT INTO users (name, email, password) VALUES (:status)",
      {
        replacements: { status: [name, email, password] },
        type: sequelize.QueryTypes.INSERT,
      }
    );

    if (person) {
      res.status(200).send({
        message: messages.singInSuccsess,
      });
    }
  }
});

module.exports = router;
