const express = require("express");
const sequelize = require("../db/sequelize");
const router = express.Router();

router.get("/users", async function (req, res) {
  const data = `%${req.query.input}%`;
  const id = req.query.id;

  const users = await sequelize.query(
    `select users.id, users.name, follower_id::bool as is_follower from users left join subscriptions 
    On users.id = subscriptions.user_id and subscriptions.follower_id = ?  where users.name ilike ? AND NOT users.id = ?`,

    {
      replacements: {
        id,
        data,
      },
      type: sequelize.QueryTypes.INSERT,
    }
  );

  if (users) {
    console.log("===========", users[0]);
    res.send(users[0]);
  }
});

module.exports = router;
