module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define('comment', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    content: {
      type: Sequelize.TEXT,
    },
  });
  // Comment.belongsTo(require('./post'));
  // Comment.belongsTo(require('./user'));

  return Comment;
}