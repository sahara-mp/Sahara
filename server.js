// require("dotenv").config();
const colors = require("colors");

const express = require('express');
const session = require('express-session');
const app = express();


var PORT = process.env.PORT || 9000;

var config = require("./config/config.js");

let exphbs = require("express-handlebars");
let routes = require("./controllers/sahara-controller.js");
let path = require('path');

app.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" })); 
app.set("view engine", "handlebars");

app.use(routes);


app.listen(PORT, function() {
    console.log(colors.rainbow("Server listening on: http://localhost:" + PORT));
  });
  

