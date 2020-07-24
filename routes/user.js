const express = require("express");
const sequelize = require("../db/sequelize");
const router = express.Router();

router.post("/user", async function (req, res) {
  const users = await sequelize.query("SELECT * FROM users WHERE id = ?", {
    replacements: [req.body.currentUserId],
    type: sequelize.QueryTypes.INSERT,
  });
  const user = users[0];
  if (user) {
    res.send(user[0]);
  }
});

module.exports = router;
