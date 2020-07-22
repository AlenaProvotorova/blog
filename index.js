const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const path = require("path");

require("./db/sequelize");
const auth = require("./routes/auth");
const posts = require("./routes/posts");
const privateStaticPages = ["/home"];

var app = express();
app.use(cookieParser());
app.use(bodyParser());

function verifyToken(token) {
  return jwt.verify(token, "secretTokenKey");
}

app.get("/", (req, res, next) => {
  if (req.cookies.token) {
    res.redirect("/home");
  }
  next();
});

app.use(express.static("public"));

app.use((req, res, next) => {
  if (!req.cookies.token && privateStaticPages.includes(req.url)) {
    res.redirect("/");
  }

  if (req.cookies.token) {
    try {
      const payload = verifyToken(req.cookies.token);
      console.log("=======payload===TOKEN=", payload);
    } catch (err) {
      console.log("=======err====", err);
      res.redirect("/");
    }
  }
  next();
});

app.use("/", auth);
app.use("/", posts);
app.get("/home", (req, res) =>
  res.sendFile(path.resolve(__dirname + "/private/home.html"))
);

app.post("/user", async function (req, res) {
  const sequelize = require("./db/sequelize");
  const users = await sequelize.query("SELECT * FROM users WHERE id = ?", {
    replacements: [req.body.currentUserId],
    type: sequelize.QueryTypes.INSERT,
  });
  const user = users[0];
  if (user) {
    res.send(user[0]);
  }
});

app.post("/search", async function (req, res) {
  const sequelize = require("./db/sequelize");
  const data = `${req.body.input}%`;

  const users = await sequelize.query(
    "SELECT * FROM users WHERE name ILIKE ?",
    {
      replacements: [data],
      type: sequelize.QueryTypes.INSERT,
    }
  );

  if (users) {
    console.log("===========", users[0]);
    res.send(users);
  }
});

app.listen(3000);
