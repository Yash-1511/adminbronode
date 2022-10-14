const mongoose = require('mongoose');
const { DATABASE } = require('../config/key');
const { sendErrorToChatbot } = require('./ErrorTelegram');

exports = mongoose.connect(
  DATABASE,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  },
  (err) => {
    if (!err) {
      console.log('MongoDB Connection Succeeded.');
    } else {
      sendErrorToChatbot('Error in DB connection: ' + err);
      console.log('Error in DB connection: ' + err);
    }
  }
);
