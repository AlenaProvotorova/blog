const jwt = require("jsonwebtoken");
require("dotenv").config();

const tokenKey = process.env.TOKEN_KEY;

function createToken(userEmail, userId) {
  const token1 = jwt.sign(
    {
      email: userEmail,
      id: userId,
    },
    tokenKey
  );
  return token1;
}

function getUserId(elem) {
  const decodedToken = jwt.decode(elem);
  return (userId = decodedToken.id);
}

function verifyToken(token) {
  return jwt.verify(token, process.env.TOKEN_KEY);
}

module.exports.createToken = createToken;
module.exports.getUserId = getUserId;
module.exports.verifyToken = verifyToken;
