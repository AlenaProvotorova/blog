const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const path = require("path");
const tokenModule = require("./utiles/token");
require("./db/sequelize");

const auth = require("./routes/auth");
const posts = require("./routes/posts");
const users = require("./routes/users");
const subscription = require("./routes/subscription");
const privateStaticPages = ["/home"];

var app = express();
app.use(cookieParser());
app.use(bodyParser());

app.get("/", (req, res, next) => {
  if (req.cookies.token) {
    res.redirect("/home");
  }
  next();
});

app.use(express.static("public"));

app.use((req, res, next) => {
  if (!req.cookies.token && privateStaticPages.includes(req.url)) {
    res.redirect("/singIn");
  }

  if (req.cookies.token) {
    try {
      const payload = tokenModule.verifyToken(req.cookies.token);
      // console.log("=======payload===TOKEN=", payload);
    } catch (err) {
      // console.log("=======err====", err);
      res.redirect("/signIn");
    }
  }
  next();
});

app.use("/", auth);
app.use("/posts", posts);
app.use("/users", users);
app.use("/", subscription);
app.get("/home", (req, res) =>
  res.sendFile(path.resolve(__dirname + "/private/home.html"))
);

app.listen(3000);
