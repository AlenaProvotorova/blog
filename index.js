const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const path = require("path");

require("./db/sequelize");
const auth = require("./routes/auth");
const posts = require("./routes/posts");
const search = require("./routes/search");
const user = require("./routes/user");
const sub = require("./routes/sub");
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
app.use("/", search);
app.use("/", user);
app.use("/", sub);
app.get("/home", (req, res) =>
  res.sendFile(path.resolve(__dirname + "/private/home.html"))
);

app.listen(3000);
