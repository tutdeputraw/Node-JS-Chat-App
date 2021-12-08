const Sequelize = require('sequelize');
const sequelize = require('../config/database.config').configSequelize(Sequelize);


const User = require('../models/user')(sequelize, Sequelize);
const Friend = require('../models/friend')(sequelize, Sequelize);
const Chat = require('../models/chat')(sequelize, Sequelize);


User.hasMany(Friend, {
  as: "friends"
});
Friend.belongsTo(User, {
  as: "user"
});

User.hasMany(Chat, {
  as: "chats"
});
Chat.belongsTo(User, {
  as: "user"
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = User;
db.friend = Friend;
db.chat = Chat;


module.exports = db;