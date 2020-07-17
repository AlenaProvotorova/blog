const express = require("express");
const sequelize = require("../db/sequelize");
const router = express.Router();

router.post("/sign-in", async function (req, res) {
  const { email, password } = req.body;
  const users = await sequelize.query("SELECT * FROM users WHERE email = ?", {
    replacements: [email],
    type: sequelize.QueryTypes.SELECT,
  });

  const user = users[0];

  if (user && user.password === password) {
    res.status(200).send({
      message: "ОК",
      userId: `${user.id}`,
    });
  } else {
    res.status(401).send();
  }
});

router.post("/sign-up", async function (req, res) {
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
