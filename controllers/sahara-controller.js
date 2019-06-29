const express = require("express");
let product = require("../models/products.js");

var router = express.Router();



router.get("/", function (req, res) {
    product.all(function (data) {
        var hbsObject = {
            products: data
        };
        res.render("index", hbsObject);
    });
});

module.exports = router;