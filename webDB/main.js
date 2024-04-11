// 202132118_박혜정

const express = require('express');
const app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

var authRouter = require('./router/authRouter');
var rootRouter = require('./router/rootRouter');
var codeRouter = require('./router/codeRouter');
var personRouter = require('./router/personRouter');
var merchandiseRouter = require('./router/merchandiseRouter');
var boardRouter = require('./router/boardRouter');
var purchaseRouter = require('./router/purchaseRouter');

var session = require('express-session');
var MySqlStore = require('express-mysql-session')(session);
var options = {
    host: '127.0.0.1',
    user: 'root',
    password: '0408',
    database: 'webdb2023'
};
var sessionStore = new MySqlStore(options);

app.use(session({
    secret: 'keboard cat',
    resave: false,
    saveUninitialized: true,
    store: sessionStore
}));

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', rootRouter);
app.use('/auth', authRouter);
app.use('/code', codeRouter);
app.use('/person', personRouter);
app.use('/merchandise', merchandiseRouter);
app.use('/board', boardRouter);
app.use('/purchase', purchaseRouter);

app.listen(3000, () => console.log('Example app listening on port 3000'));