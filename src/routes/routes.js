module.exports = app => {
  app.use(require('./root.routes'));
  app.use('/user', require('./user.routes'));
}