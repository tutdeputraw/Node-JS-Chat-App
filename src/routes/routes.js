module.exports = app => {
  app.use(require('./root.routes'));
  app.use('/user', require('./user.routes'));
  app.use('/friend', require('./friend.routes'));
  app.use('/chat', require('./chat.routes'));
}