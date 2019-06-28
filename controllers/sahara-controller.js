const express = require("express");
let product = require("../models/products.js");

var router = express.Router();


//HOME PAGE
router.get("/", function (req, res) {
    product.all(function (data) {
        var hbsObject = {
            products: data
        };
        res.render("index", hbsObject);
        // console.log(hbsObject);
    });
});

//SEARCH BAR
router.get("/api/:item", function (req, res){
    var searchTerm = req.params.item
    product.search(searchTerm, function (data){
        var searchItem = {
            products: data
        };
        console.log(searchItem);
        res.render("index", searchItem);
    });
});

//LOGIN PAGE
router.get("/login", function (req, res) {
    res.render("login");
});

//SIGN UP PAGE
router.get("/signup", function (req, res) {
    res.render("signup");
});


module.exports = router;