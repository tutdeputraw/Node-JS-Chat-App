const Sequelize = require('sequelize');
const sequelize = require('../config/database.config').configSequelize(Sequelize);


const User = require('../models/user')(sequelize, Sequelize);
const Post = require('../models/post')(sequelize, Sequelize);
const Comment = require('../models/comment')(sequelize, Sequelize);


User.hasMany(Post);
Post.belongsTo(User);

User.hasMany(Comment);
Comment.belongsTo(User);

Post.hasMany(Comment);
Comment.belongsTo(User);


const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = User;
db.post = Post;
db.comment = Comment;


module.exports = db;