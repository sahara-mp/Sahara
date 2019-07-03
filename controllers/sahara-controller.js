const express = require("express");
let product = require("../models/products.js");
let user = require("../models/user.js");
// let category = require("../public/assets/js/categories.js");

var router = express.Router();


//HOME PAGE
router.get("/", function (req, res) {
    product.topThree(function (data) {
        var hbsObject = {
            "products": data,
            "test":"testing"
        };
        // console.log("ViewModel", hbsObject);
        res.render("index", hbsObject);
    });
});

// Displays all items
router.get("/api/search/all", function (req, res) {
    product.all(function (data) {
        var hbsObject = {
            products: data
        };
        // console.log("All", hbsObject);
        res.render("index", hbsObject);
    });
});

//SEARCH BAR
router.post("/api/search", function (req, res) {
    product.search(req.body.searchTerm, function (data) {
        res.render("index", { products: data });
    });
});

//Categories Dropdown
router.get("/categories/:category", function (req, res) {
    var category = req.params.category;
    console.log('and the category is', category);
    product.category(category, function (data) {

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
});

router.get("/products/", function (req, res) {
    res.render("products");
});

router.get("/products/:product", function (req, res) {
    product.searchid(req.params.product, function (data) {
        res.render("products", { product: data });
    });
});

router.post("/api/EmailAndPassword", function (req, res) {
    user.create([
        "UserFullName", "UserEmail", "UserPassword"
    ], [
            req.body.UserFullName, req.body.UserEmail, req.body.UserPassword
        ], function (result) {
            //redirect to new user profile page after completion
            // res.json({ id: result.insertId });
            // console.log(result.insertId);
            let userId = result.insertId;
            //login function bypassing checking password
        });
});

router.post("/api/addItem", function (req, res) {
    let newItem = {
        user: req.body.user, 
        product_name: req.body.product_name,
        product_cateogry: req.body.product_category,
        product_price: req.body.product_price, 
        product_description: req.body.product_description, 
        quantity_remaining: req.body.quantity_remaining, 
        image: req.body.image
    };
    console.log(newItem);
    product.create([
        "user", "product_name", "product_category", "product_price", "product_description", "quantity_remaining", "image"
    ], [
        req.body.user, req.body.product_name, req.body.product_category, req.body.product_price, req.body.product_description, req.body.quantity_remaining, req.body.image
    ], function (result) {
        //redirect to new item page listing after completion
        console.log(result);
        res.render("products", { product: newItem });
        
    });
});


module.exports = router;