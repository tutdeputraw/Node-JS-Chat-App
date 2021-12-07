module.exports = (sequelize, Sequelize) => {
  const Chat = sequelize.define('chat', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    sender: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
  });

  return Chat;
}