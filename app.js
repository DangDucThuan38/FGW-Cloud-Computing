var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


//var indexRouter = require('./routes/index');
var productRouter = require('./routes/product')
var categoryRouter = require('./routes/category')
var boyRouter= require('./routes/boy');
var girlRouter = require('./routes/girl')


var app = express();



//var mongoose = require("mongoose");
var url="mongodb+srv://Dangthuan38:Thuan0308*@cluster0.0terhnf.mongodb.net/project1644";

var url="mongodb://127.0.0.1:27017/project";
mongoose.connect(url, { useNewUrlParser: true }, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("connect to db succeed !");
  }
});


var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', indexRouter);
app.use('/',productRouter);
app.use('/category',categoryRouter);
app.use('/boy',boyRouter);
app.use('/girl',girlRouter);




var hbs = require('hbs');
hbs.registerHelper('dateFormat', require('handlebars-dateformat'));

hbs.registerHelper("equal", require("handlebars-helper-equal"))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log("Server is running at http://localhost:3000");
});
module.exports = app;
