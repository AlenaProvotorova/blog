const tokenKey = require("../dotenv");

const tokenKey = process.env.TOKEN_KEY;

module.exports = function createToken(userEmail, userId) {
  const token = jwt.sign(
    {
      email: userEmail,
      id: userId,
    },
    tokenKey
  );
  return token;
};
