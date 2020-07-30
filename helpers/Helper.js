class Helper {
  tryCatchFunc(callback) {
    return function (...rest) {
      try {
        callback(...rest);
      } catch (error) {
        console.log("=======errorCatch====", error);
      }
    };
  }
}

var helper = new Helper();

module.exports = helper;
