exports.configSequelize = Sequelize => {
  const sequelize = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD, {
      dialect: process.env.DB_CONNECTION,
      host: process.env.DB_HOST
    });

  return sequelize;
}