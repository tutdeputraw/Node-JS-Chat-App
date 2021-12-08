const Chat = require('../database/mysql').chat;
const Op = require("sequelize").Op;
var uid = require('rand-token').uid;

exports.storeChat = (req, res) => {
  Chat.create({
    receiverId: req.body.receiverId,
    message: req.body.message,
    userId: req.body.userId
  }).then(result => {
    console.log('success');
  });
};