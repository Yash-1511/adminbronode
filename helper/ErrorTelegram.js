const TelegramBot = require('node-telegram-bot-api');
const Error = require('../model/error');
const { CHATBOT_CHATID, TOKEN_CHATBOT } = require('../config/key');

const bot = new TelegramBot(TOKEN_CHATBOT, { polling: true });

// 'CastError',
// '11000',
// 'ValidationError',
// 'JsonWebTokenError',
// 'TokenExpiredError',

const createMsg = (msg) => {
  let err = null;

  if (msg.name === 'CastError')
    err = { content: msg.message, typeErr: 'CastError' };
  if (msg.name === 'ValidationError') {
    let type = null;
    const errors = Object.values(msg.errors).map((el) => {
      type = el.kind;
      return el.message;
    });
    err = {
      content: errors.join('\n'),
      typeErr: type === 'unique' ? '11000' : 'ValidationError',
    };
  }
  if (msg.name === 'JsonWebTokenError') {
    err = {
      content: 'Token không hợp lệ. Hãy đăng nhập lại!',
      typeErr: 'JsonWebTokenError',
    };
  }
  if (msg.name === 'TokenExpiredError') {
    err = {
      content: 'Token của bạn đã hết hạn! Hãy đăng nhập lạii.',
      typeErr: 'TokenExpiredError',
    };
  }

  return err;
};

bot.onText(/(.+)/, async (msg, match) => {
  let error = match[1];
  const typeErr = [
    'CastError',
    '11000',
    'ValidationError',
    'JsonWebTokenError',
    'TokenExpiredError',
  ];

  if (typeErr.includes(error) || error === 'Duplicate') {
    bot.sendMessage(CHATBOT_CHATID, `Danh sách các lỗi ${error}:`);
    const errors = await Error.find({
      typeErr: error === 'Duplicate' ? 11000 : error,
    }).limit(10);

    let message = '';
    errors.forEach(
      (item) =>
        (message += `${new Date(item.createdAt).toLocaleString()}\n${
          item.content
        }\n\n`)
    );

    bot.sendMessage(CHATBOT_CHATID, message.trim());
  }
});

module.exports.sendErrorToChatbot = (msg) => {
  const opts = {
    reply_markup: {
      keyboard: [
        ['CastError', 'Duplicate'],
        ['ValidationError', 'JsonWebTokenError'],
        ['TokenExpiredError'],
      ],
      resize_keyboard: true,
      one_time_keyboard: true,
    },
  };

  // let message = createMsg(msg);
  // if (message) {
  bot.sendMessage(CHATBOT_CHATID, msg, opts);
  // Error.create(message);
  // }
};
