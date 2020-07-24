const express = require("express");
const sequelize = require("../db/sequelize");
const router = express.Router();

router.post("/subscription", async function checkSubscribe(req, res) {
  console.log("=======check-====");
  const command = await sequelize.query(
    "INSERT INTO subscriptions VALUES (:status)",
    {
      replacements: {
        status: [req.body.currentUserId, req.body.personFollowId],
      },
      type: sequelize.QueryTypes.INSERT,
    }
  );
  if (command) {
    res.send({ message: "Добавлено в базу" });
  }
});

router.delete("/subscription", async function checkSubscribe(req, res) {
  console.log("=======check+====");
  const command = sequelize.query(
    "delete from subscriptions where follower_id=? AND user_id=?",
    {
      replacements: [req.query.currentUserId, req.query.personFollowId],
      type: sequelize.QueryTypes.INSERT,
    }
  );
  if (command) {
    res.send({ message: "Удалено из базы" });
  }
});

router.get("/friendsamount", async function (req, res) {
  const amount = await sequelize.query(
    "SELECT COUNT(user_id) FROM subscriptions  WHERE subscriptions.follower_id = ?",
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
