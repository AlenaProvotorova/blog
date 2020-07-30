const express = require("express");
const sequelize = require("../db/sequelize");
const router = express.Router();
const helper = require("../helpers/Helper");
const token = require("../utiles/token");

router.post(
  "/",
  helper.tryCatchFunc(async function (req, res) {
    const dateDay = new Date().getDate();
    const dateMonth = new Date().getMonth();
    const dateYear = new Date().getFullYear();
    const mainDate = `${dateDay}:${dateMonth}:${dateYear}`;

    const { title, postText } = req.body;
    const userId = token.getUserId(req.cookies.token);

    const posts = await sequelize.query(
      "INSERT INTO posts (title, post_text, fk_user_id, date) VALUES (:status)",
      {
        replacements: {
          status: [title, postText, userId, mainDate],
        },
        type: sequelize.QueryTypes.INSERT,
      }
    );

    if (posts) {
      res.status(200).send({
        message: "Post saved in DB",
      });
    }
  })
);

router.get(
  "/",
  helper.tryCatchFunc(async function (req, res) {
    const userId = token.getUserId(req.cookies.token);

    const posts = await sequelize.query(
      `SELECT title, post_text, date, follower_id::bool AS is_follower , users.name FROM posts 
    LEFT JOIN subscriptions ON posts.fk_user_id = subscriptions.user_id AND subscriptions.follower_id = ? 
    LEFT JOIN users ON subscriptions.user_id = users.id WHERE follower_id IS NOT NULL`,
      {
        replacements: [userId],
        type: sequelize.QueryTypes.SELECT,
      }
    );

    if (posts) {
      res.send(posts);
    }
  })
);

router.get(
  "/currentUser",
  helper.tryCatchFunc(async function (req, res) {
    const userId = token.getUserId(req.cookies.token);

    const userPosts = await sequelize.query(
      "SELECT posts.title, posts.post_text, users.name, posts.date FROM posts INNER JOIN users ON posts.fk_user_id=users.id WHERE fk_user_id=? ",
      {
        replacements: [userId],
        type: sequelize.QueryTypes.SELECT,
      }
    );

    if (userPosts) {
      res.send(userPosts);
    }
  })
);

router.get(
  "/amount",
  helper.tryCatchFunc(async function (req, res) {
    const userId = token.getUserId(req.cookies.token);

    const amount = await sequelize.query(
      "SELECT COUNT(title) FROM posts WHERE fk_user_id = ?",
      {
        replacements: [userId],
        type: sequelize.QueryTypes.SELECT,
      }
    );
    const amount1 = amount[0];

    if (amount1) {
      res.send(amount1);
    }
  })
);

module.exports = router;
