const express = require('express');
const mongodb = require('./db/connect');
const bodyParser = require('body-parser');
const app = express();

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization'
    );
    res.setHeader(
      'Access-Control-Allow-Methods',
      'POST, GET, PUT, PATCH, OPTIONS, DELETE'
    );
    next();
  })
  .use('/', require('./routes/index'));

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  }
});

module.exports = app;
