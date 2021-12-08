module.exports = (sequelize, Sequelize) => {
  const Chat = sequelize.define('chat', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    receiverId: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    message: {
      type: Sequelize.TEXT
    }
  });

  return Chat;
}