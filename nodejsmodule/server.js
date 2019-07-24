/*eslint no-console: 0*/
//"use strict";

/*var http = require("http");
var port = process.env.PORT || 3000;

http.createServer(function (req, res) {
  res.writeHead(200, {"Content-Type": "text/plain"});
  res.end("Hello World\n");
}).listen(port);

console.log("Server listening on port %d", port);

*/

/*const express = require('express');
const app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('myapp listening on port ' + port);
});*/


/*
const express = require('express');
const passport = require('passport');
const xsenv = require('@sap/xsenv');
const JWTStrategy = require('@sap/xssec').JWTStrategy;

const app = express();

const services = xsenv.getServices({ uaa:'myuaa' });
//const services = xsenv.getServices({uaa:{tag:"myuaa"}}).uaa;

passport.use(new JWTStrategy(services.uaa));

app.use(passport.initialize());
app.use(passport.authenticate('JWT', { session: false }));
 
app.get("/", function (req, res) {
  res.send('Application user: ' + req.user.id);
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('myapp listening on port ' + port);
});
*/

const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const xsenv = require('@sap/xsenv');
const JWTStrategy = require('@sap/xssec').JWTStrategy;

const users = require('./users.json');
const app = express();

const services = xsenv.getServices({ uaa: 'myuaa' });

passport.use(new JWTStrategy(services.uaa));

app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.authenticate('JWT', { session: false }));

app.get('/users', function (req, res) {
  var isAuthorized = req.authInfo.checkScope('$XSAPPNAME.Display');
  if (isAuthorized) {
    res.status(200).json(users);
  } else {
    res.status(403).send('Forbidden');
  }
});

app.post('/users', function (req, res) {
  const isAuthorized = req.authInfo.checkScope('$XSAPPNAME.Update');
  if (!isAuthorized) {
    res.status(403).json('Forbidden');
    return;
  }

  var newUser = req.body;
  newUser.id = users.length;
  users.push(newUser);

  res.status(201).json(newUser);
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('myapp listening on port ' + port);
});
