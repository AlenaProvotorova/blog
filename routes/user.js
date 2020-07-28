const express = require("express");
const sequelize = require("../db/sequelize");
const router = express.Router();

router.get("/", async function (req, res) {
  const users = await sequelize.query(`SELECT * FROM users WHERE id = ?`, {
    replacements: [req.cookies.CurrentUserId],
    type: sequelize.QueryTypes.INSERT,
  });
  const user = users[0];
  if (user) {
    res.send(user[0]);
  }
});

router.get("/friendsAmount", async function (req, res) {
  const amount = await sequelize.query(
    "SELECT COUNT(user_id) FROM subscriptions WHERE subscriptions.follower_id = ?",
    {
      replacements: [req.query.currentUserId],
      type: sequelize.QueryTypes.INSERT,
    }
  );
  const amount1 = amount[0];

  if (amount1) {
    res.send(amount1[0]);
  }
});

module.exports = router;
