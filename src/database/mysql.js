const Sequelize = require('sequelize');
const sequelize = require('../config/database.config').configSequelize(Sequelize);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('../models/user')(sequelize, Sequelize);

module.exports = db;