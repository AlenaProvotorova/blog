const express = require("express");
const sequelize = require("../db/sequelize");
const router = express.Router();

router.post("/posts", async function (req, res) {
  const dateDay = new Date().getDate();
  const dateMonth = new Date().getMonth();
  const dateYear = new Date().getFullYear();
  const mainDate = `${dateDay}:${dateMonth}:${dateYear}`;

  const { title, postText, currentUserId } = req.body;
  const posts = await sequelize.query(
    "INSERT INTO posts (title, post_text, fk_user_id, date) VALUES (:status)",
    {
      replacements: {
        status: [title, postText, currentUserId, mainDate],
      },
      type: sequelize.QueryTypes.INSERT,
    }
  );

  if (posts) {
    res.status(200).send({
      message: "Post saved in DB",
    });
  }
});

router.get("/posts", async function (req, res) {
  console.log("======req.co.currentUserId=====", req.cookies.CurrentUserId);
  const posts = await sequelize.query(
    `SELECT title, post_text, date, follower_id::bool AS is_follower , users.name FROM posts 
    LEFT JOIN subscriptions ON posts.fk_user_id = subscriptions.user_id AND subscriptions.follower_id = ? 
    LEFT JOIN users ON subscriptions.user_id = users.id WHERE follower_id IS NOT NULL`,
    {
      replacements: [+req.cookies.CurrentUserId],
      type: sequelize.QueryTypes.INSERT,
    }
  );

  if (posts) {
    res.send(posts[0]);
  }
});

router.post("/currentUser", async function (req, res) {
  const userPosts = await sequelize.query(
    "select posts.title, posts.post_text, users.name, posts.date FROM posts INNER JOIN users ON posts.fk_user_id=users.id WHERE fk_user_id=? ",
    {
      replacements: [req.body.currentUserId],
      type: sequelize.QueryTypes.INSERT,
    }
  );
  if (userPosts) {
    console.log("=====userPosts======", userPosts);
    let UserObject = userPosts[0];
    res.send(UserObject);
  }
});

router.get("/postsamount", async function (req, res) {
  const amount = await sequelize.query(
    "SELECT COUNT(title) FROM posts WHERE fk_user_id = ?",
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
