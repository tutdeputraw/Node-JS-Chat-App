const Sequelize = require('sequelize');
const sequelize = require('../config/database.config').configSequelize(Sequelize);


const User = require('../models/user')(sequelize, Sequelize);
const Friend = require('../models/friend')(sequelize, Sequelize);


User.hasMany(Friend, {
  as: "friends"
});
Friend.belongsTo(User, {
  as: "user"
});


const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = User;
db.friend = Friend;


module.exports = db;