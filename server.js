var express      = require('express'),
  app            = express(),
  logger         = require('morgan'),
  bodyParser     = require('body-parser'),
  cors           = require('cors'),
  router         = require('./routes');

app.listen(process.env.PORT || 8080);
console.log("App listening on port 8080");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(cors());

router(app);
