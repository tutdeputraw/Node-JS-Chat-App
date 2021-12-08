module.exports = (sequelize, Sequelize) => {
  const Friend = sequelize.define('friend', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    friendId: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
  });

  return Friend;
}