// require("dotenv").config();
const colors = require("colors");

var express = require('express');
var app = express();
var PORT = process.env.PORT || 9000;
var config = require("./config/config.js");
let exphbs = require("express-handlebars");
let routes = require("./controllers/sahara-controller.js");


app.use(routes);

app.use(express.static(__dirname + '/views'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


app.listen(PORT, function() {
    console.log(colors.rainbow("Server listening on: http://localhost:" + PORT));
  });
  

