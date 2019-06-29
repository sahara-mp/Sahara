const express = require("express");
let product = require("../models/products.js");
let user = require("../models/user.js");

var router = express.Router();


//HOME PAGE
router.get("/", function (req, res) {
    product.all(function (data) {
        var hbsObject = {
            products: data
        };
        res.render("index", hbsObject);
    });
});

//Displays all items
// router.get("/api/search/all", function (req, res) {
//     product.all(function (data) {
//         var hbsObject = {
//             products: data
//         };
//         // console.log("All", hbsObject);
//         res.render("index", hbsObject);
//     });
// });

//SEARCH BAR
router.post("/search", function (req, res) {
    product.search(req.body.searchTerm, function (data) {
        res.render("index", { products: data });
    });
});

//LOGIN PAGE
router.get("/login", function (req, res) {
    res.render("login");
});

//User Profile Page Route
router.get("/userProfile", function (req, res) {
    res.render("profile");
})

//SIGN UP PAGE
router.get("/signup", function (req, res) {
    res.render("signup");
});

//Purchase Page
router.get("/purchase", function (req, res) {
    res.render("purchase");
});

//Purchase Confirmation Page
router.get("/confirmation", function (req, res) {
    res.render("confirmation");
});

//Order History Page
router.get("/orderhistory", function (req, res) {
    res.render("orderhistory");
});

router.get("/addItems", function (req, res) {
    res.render("addItems");
})

router.post("/api/EmailAndPassword", function (req, res) {
    user.create([
        "UserFullName", "UserEmail", "UserPassword"
    ], [
            req.body.UserFullName, req.body.UserEmail, req.body.UserPassword
        ], function (result) {
            //redirect to new user profile page after completion
            res.json({ id: result.insertId });
        });
});

router.post("/api/addItem", function (req, res) {
    product.create([
        "product_name", "product_category", "product_price", "product_description", "quantity_remaining"
    ], [
            req.body.ItemName, req.body.ItemCategory, req.body.ItemPrice, req.body.ItemDescription, req.body.ItemQuantity, req.body.ItemImage
        ], function (result) {
            //redirect to new item page listing after completion
            console.log(result);
            res.json({ id: result.insertId });
        });
});
module.exports = router;