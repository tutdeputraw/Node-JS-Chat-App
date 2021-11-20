module.exports = (sequelize, Sequelize) => {
  const model = {};
  const User = require('../models/user')(sequelize, Sequelize);
  const Friend = require('../models/friend')(sequelize, Sequelize);

  User.hasMany(Friend);
  Friend.belongsTo(User);

  model.user = User;
  model.friend = Friend;

  return model;
};