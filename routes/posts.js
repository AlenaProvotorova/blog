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
  const posts = await sequelize.query(
    "select posts.title, posts.post_text, users.name, posts.date FROM posts INNER JOIN users ON posts.fk_user_id=users.id",
    {
      type: sequelize.QueryTypes.INSERT,
    }
  );

  console.log("=======posts====", posts[0]);
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
    let UserObject = userPosts[0];
    console.log("=======vceokay====", UserObject);
    res.send(UserObject);
  }
});

module.exports = router;
