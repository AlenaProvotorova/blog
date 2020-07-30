const express = require("express");
const sequelize = require("../db/sequelize");
const router = express.Router();
const jwt = require("jsonwebtoken");
const helper = require("../helpers/Helper");
const token = require("../utiles/token");

router.get(
  "/",
  helper.tryCatchFunc(async function (req, res) {
    const userId = token.getUserId(req.cookies.token);

    const users = await sequelize.query(`SELECT * FROM users WHERE id = ?`, {
      replacements: [userId],
      type: sequelize.QueryTypes.INSERT,
    });
    const user = users[0];

    if (user) {
      res.send(user[0]);
    }
  })
);

router.get(
  "/allUsers",
  helper.tryCatchFunc(async function (req, res) {
    const userId = token.getUserId(req.cookies.token);

    const users = await sequelize.query(
      `SELECT users.id, users.name, follower_id::bool AS is_follower 
    FROM users 
    LEFT JOIN subscriptions 
    ON users.id = subscriptions.user_id AND subscriptions.follower_id = $1  
    WHERE users.name ILIKE $2 AND NOT users.id = $1`,

      {
        bind: [userId, `%${req.query.input}%`],
        type: sequelize.QueryTypes.SELECT,
      }
    );

    if (users) {
      res.send(users);
    }
  })
);

router.get(
  "/friendsAmount",
  helper.tryCatchFunc(async function (req, res) {
    const userId = token.getUserId(req.cookies.token);

    const amount = await sequelize.query(
      "SELECT COUNT(user_id) FROM subscriptions WHERE subscriptions.follower_id = ?",
      {
        replacements: [userId],
        type: sequelize.QueryTypes.SELECT,
      }
    );

    if (amount) {
      res.send(amount[0]);
    }
  })
);

module.exports = router;
