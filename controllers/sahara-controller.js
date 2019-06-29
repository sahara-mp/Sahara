const express = require("express");
let product = require("../models/products.js");

var router = express.Router();


//HOME PAGE
router.get("/", function (req, res){
        res.render("index");
})

//Displays all items
router.get("/api/search/all", function (req, res) {
    product.all(function (data) {
        var hbsObject = {
            products: data
        };
        console.log("All", hbsObject);
        res.render("index", hbsObject);
    });
});

//SEARCH BAR
router.get("/api/search/:item", function (req, res){
    var searchTerm = req.params.item
    product.search(searchTerm, function (data){
        var hbsObject = {
            products: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
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