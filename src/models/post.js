module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define('post', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    image: {
      type: Sequelize.BLOB,
    },
    caption: {
      type: Sequelize.TEXT,
    },
    upvote: {
      type: Sequelize.BIGINT,
    },
    downvote: {
      type: Sequelize.BIGINT,
    },
  });
  // Post.hasMany(require('./comment'));
  // Post.belongsTo(require('./user'));

  return Post;
}