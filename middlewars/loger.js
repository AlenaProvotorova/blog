module.exports = function loger(req, res, next) {
  console.log("=======console====", req.body);
  next();
};
