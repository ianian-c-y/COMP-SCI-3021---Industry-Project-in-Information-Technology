var express = require('express');
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get('/CVE-Enquiry', async (req, res) => {res.sendFile(path.join(__dirname, 'public', 'COMP SCI 3021 - Industry Project in Information Technology', 'CVE-Enquiry.html'));});

const CVE_Data = require('./routes/COMP_SCI_3021_Industry_Project_in_Information_Technology');
app.use('/api/cve', CVE_Data);

app.use(function(req, res, next) {next(createError(404));});
app.use(function(err, req, res, next) {
  res.status(err.status || 500).json({
    message: err.message,
    error: req.app.get('env') === 'development' ? err.stack : 'Something went wrong'
  });
});

module.exports = app;