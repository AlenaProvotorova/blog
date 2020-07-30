const express = require("express");
const sequelize = require("../db/sequelize");
const router = express.Router();
const messages = require("../helpers/hashmap");
const token = require("../utiles/token");

router.post("/subscription", async function checkSubscribe(req, res) {
  const userId = token.getUserId(req.cookies.token);
  const command = await sequelize.query(
    "INSERT INTO subscriptions VALUES (:status)",
    {
      replacements: {
        status: [userId, req.body.personFollowId],
      },
      type: sequelize.QueryTypes.INSERT,
    }
  );
  if (command) {
    res.send({ message: messages.subscriptionAddinDataBase });
  }
});

router.post("/unsubscription", async function checkSubscribe(req, res) {
  const userId = token.getUserId(req.cookies.token);
  const command = sequelize.query(
    "DELETE FROM subscriptions WHERE follower_id=? AND user_id=?",
    {
      replacements: [userId, req.body.personFollowId],
      type: sequelize.QueryTypes.DELETE,
    }
  );
  if (command) {
    res.send({ message: messages.subscriptionDeleteFromDataBase });
  }
});

module.exports = router;
