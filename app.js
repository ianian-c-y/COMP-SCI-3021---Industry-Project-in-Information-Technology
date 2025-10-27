require('dotenv').config();
const express = require('express');
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var claudeRouter = require('./routes/Claude');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
app.get('/', async (req, res) => {res.sendFile(path.join(__dirname, 'public', 'HTML', 'CVE-Enquiry.html'));});
app.use('/users', usersRouter);

app.get('/CVE-Enquiry', async (req, res) => {res.sendFile(path.join(__dirname, 'public', 'COMP SCI 3021 - Industry Project in Information Technology', 'CVE-Enquiry.html'));});
app.get('/search', async (req, res) => {res.sendFile(path.join(__dirname, 'public', 'Design', 'CVE-Enquiry.html'));});
app.get('/search-result', async (req, res) => {res.sendFile(path.join(__dirname, 'public', 'Design', 'CVE-Results.html'));});
app.get('/public/Design/CVE-Results.html', async (req, res) => {res.sendFile(path.join(__dirname, 'public', 'Design', 'CVE-Results.html'));});

const CVE_Data = require('./routes/COMP_SCI_3021_Industry_Project_in_Information_Technology');
app.use('/api/cve', CVE_Data);
app.use('/api', claudeRouter);


/* ---------------------------------------- */
app.get('/api/check-claude', (req, res) => {
  res.json({
    isClaudeAvailable: !!process.env.CLAUDE_API_KEY
  });
});
/* ---------------------------------------- */

// app.use(function(req, res, next) {next(createError(404));});
app.use(function(err, req, res, next) {
  res.status(err.status || 500).json({
    message: err.message,
    error: req.app.get('env') === 'development' ? err.stack : 'Something went wrong'
  });
});

module.exports = app;