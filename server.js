require('dotenv').config();
const express = require('express');
const database = require('./src/database/mysql');

const app = express();

require('./src/middleware/middleware')(app);

require('./src/routes/routes')(app);

database.sequelize
  .sync()
  .then(result => {
    app.listen(process.env.SERVER_PORT);
    require('./socket');
  })
  .catch(err => {
    console.log(err);
  });