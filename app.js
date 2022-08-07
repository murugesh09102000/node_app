var express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('_helpers/jwt');
var createError = require('http-errors');
var app = express();


app.use(express.json());
app.use(jwt());
app.use(express.urlencoded({ extended: false }));

//users routes
app.use("/users", require("./routes/users"))

//tickets routes
app.use("/tickets", require("./routes/ticket-routes"))


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 3000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
