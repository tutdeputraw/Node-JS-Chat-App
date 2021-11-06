require('dotenv').config();
const express = require('express');

const app = express();

require('./src/routes/routes')(app);

app.listen(process.env.SERVER_PORT);