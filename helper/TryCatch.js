const pTimeout = require("p-timeout");
const AppErr = require("./AppError");
const { sendErrorToChatbot } = require("./ErrorTelegram");

module.exports = (fn) => {
  return (req, res, next) => {
    pTimeout(fn(req, res, next).catch(next), 5000, () => {
      sendErrorToChatbot(`${req.originalUrl} tải quá lâu`);
      next(new AppErr(`${req.originalUrl} tải quá lâu`, 500));
    });
  };
};
