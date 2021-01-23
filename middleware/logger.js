const moment = require('moment');

// to create middleware, it takes, req, res, and next. Always call next last
// so you can move to the next middleware function that's in the stack
// basically with middleware you can do what you want while you have access to req and res
// objs, like saving this log into a file for example
const logger = (req, res, next) => {
  // req gives access to certain parts fo the url
  console.log(
    `${req.protocol}://${req.get('host')}${
      req.originalUrl
    }: ${moment().format()}`
  );
  next();
};

module.exports = logger;
