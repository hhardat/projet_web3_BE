var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

const corsOptions = {
    origin: 'http://localhost:3000',
  };

var productRouter = require('./routes/products');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/photos", express.static("photos"));

app.use('/products', cors(corsOptions),  productRouter);
app.use('/users', usersRouter);

module.exports = app;
