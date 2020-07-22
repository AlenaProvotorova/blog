const express = require("express");
const sequelize = require("../db/sequelize");
const router = express.Router();
const jwt = require("jsonwebtoken");

function loger(req, res, next) {
  console.log("=======console====", req.body);
  next();
}

const tokenKey = "secretTokenKey";
function createToken(userEmail, userId) {
  const token = jwt.sign(
    {
      email: userEmail,
      id: userId,
    },
    tokenKey
  );
  return token;
}

router.post("/sign-in", loger, async function (req, res) {
  const { email, password } = req.body;
  const users = await sequelize.query("SELECT * FROM users WHERE email = ?", {
    replacements: [email],
    type: sequelize.QueryTypes.SELECT,
  });

  const user = users[0];

  if (user && user.password === password) {
    const token = createToken(user.email, user.id);
    res.cookie("token", token);
    res.status(200).send({
      userId: `${user.id}`,
    });
  } else {
    res.status(401).send();
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
      message: "A user with this email already exists.",
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
        message: "Registration sucsessfully",
      });
    }
  }
});

module.exports = router;
