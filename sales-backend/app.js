const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors");
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const ticket = require('./routes/ticket');
const region = require('./routes/region');
const flight = require('./routes/flight');
const order = require('./routes/order');
const transfer = require('./routes/transfer');
const registration = require('./routes/registration');
const visa = require('./routes/visa');
const auth = require("./service/auth")
const app = express();

app.set('view engine', 'html');
app.use(logger('dev'));
app.use(cors());
app.use(auth);
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use('/public',express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/register', registration);
app.use('/ticket', ticket);
app.use('/region', region);
app.use('/flight', flight);
app.use('/order', order);
app.use('/transfer', transfer);
app.use('/visa', visa);

module.exports = app;
