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
            "test": "testing"
        };
        // console.log("ViewModel", hbsObject);
        res.render("index", hbsObject);
    });
});

// DISPLAYS ALL ITEMS
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
    console.log(req.body);
    product.search(req.body.searchTerm, function (data) {
        console.log("this is search bar data: ", data)
        if (data.length < 1) {
            res.render("noProduct");
        } else {
            res.render("index", { products: data });
        }
    });
});

//CATEGORIES DROPDOWN
router.get("/categories/:category", function (req, res) {
    var category = req.params.category;
    console.log('and the category is', category);
    product.category(category, function (data) {

        res.render("index", { products: data });
    });
});

//NO PRODUCT PAGE
router.get("/noProduct", function (req, res) {
    res.render("noProduct");
});

//LOGIN PAGE
router.get("/login", function (req, res) {
    res.render("login");
});

//ABOUT PAGE
router.get("/about", function (req, res) {
    res.render("about");
});

//USER PROFILE PAGE 
router.get("/userProfile", function (req, res) {
    res.render("profile");
})

//SIGN UP PAGE
router.get("/signup", function (req, res) {
    res.render("signup");
});

//PURCHASE PAGE
router.get("/purchase", function (req, res) {
    // console.log(req.params.product);
    // product.searchid(req.params.product, function (data) {
    //     // console.log(data.product_name);
    //     if (!data) {
    //         res.render("noProduct");
    //     } else {
    //         res.render("products", { product: data });
    //     }
    // });
    res.render('purchase')
});

//PURCHASE CONFIRMATION PAGE
router.get("/confirmation", function (req, res) {
    res.render("confirmation");
});

//ORDER HISTORY PAGE
router.get("/orderhistory", function (req, res) {
    res.render("orderhistory");
});

//ADD ITEMS PAGE
router.get("/addItems", function (req, res) {
    res.render("addItems");
});

//PRODUCTS PAGE
router.get("/products", function (req, res) {
    res.render("products");
});

//GET PRODUCT ID FOR ON CLICK FUNCTION
router.get("/api/products/:product", function (req, res) {
    console.log(req.params.product);
    product.searchid(req.params.product, function (data) {
        // console.log(data.product_name);
        if (!data) {
            res.render("noProduct");
        } else {
            res.render("products", { product: data });
        }
    });
});

//UPDATE PRODUCT
router.get("/api/products/update/:product", function (req, res) {
    console.log("this is req.params.product: ", req.params.product);
    product.searchid(req.params.product, function (data) {
        console.log(data);
        res.render("updateProduct", { product: data });
    });
});

//CREATE NEW USER
router.post("/api/EmailAndPassword", function (req, res) {
    console.log("this is req.body.UserEmail:", req.body.UserEmail);
    user.userPage(req.body.UserEmail, function (data){
        console.log("this is UserPage data: ", data);
        if (data){
            let userExists = {
                exists: "This User Already Exists"
            }
            console.log("This User Exists")
            res.render("signup", { userExists: userExists })
        }else {
            user.create([
                "UserFullName", "UserEmail", "UserPassword"
            ], [
                    req.body.UserFullName, req.body.UserEmail, req.body.UserPassword
                ], function (result) {
                    //redirect to new user profile page after completion
                    // res.json({ id: result.insertId });
                    // console.log(result.insertId);
                    console.log("this is create result: ", result);
                    let userId = result.insertId;
                    console.log(userId);
                    user.loginEmail(req.body.UserEmail, function(data) {
                        console.log("this is login data: ", data)

                            res.render("profile", { userInfo: data });

                    });
                    //login function bypassing checking password
                });
        }
    }) 
    
});

// user login
router.post("/api/login", function (req, res) {
    console.log(req.body);
    let UserEmail = req.body.UserEmail;
    let UserPassword = req.body.UserPassword;
    console.log("UserEmail: ", UserEmail);
    console.log("UserPass: ", UserPassword);
    let userLogin = [UserEmail, UserPassword]
    console.log("this is userLogin", userLogin);
    user.login(userLogin, function(data) {
        console.log("this is login data: ", data)
        if (!data) {
            let badLogin = {
                badLogin: "The Email or Password entered is incorrect"
            }
            res.render("login", {badLogin: badLogin});
        } else {
            res.render("profile", { userInfo: data });
        }
    });
});

router.get("/api/userProfile/:user", function (req, res) {
    let userEmail = req.params.user;
    user.userPage(userEmail, function (data) {
        console.log("this is userProfile data: ", data)
        res.render("profile", { userInfo: data });
    })
})



//ADD ITEM
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
    product.search(newItem.product_name, function (data) {
        if (data[0].product_name) {
            let alreadyExists = {
                exists: "This Item Already Exists"
            }
            console.log("This Item Exists")
            res.render("addItems", { thisExists: alreadyExists })
        } else {
            product.create([
                "user", "product_name", "product_category", "product_price", "product_description", "quantity_remaining", "image"
            ], [
                    req.body.user, req.body.product_name, req.body.product_category, req.body.product_price, req.body.product_description, req.body.quantity_remaining, req.body.image
                ], function (result) {
                    //redirect to new item page listing after completion
                    console.log(result);
                    res.render("products", { product: newItem });

                });
        }
    });
});

//UPDATING ITEM
router.put("/api/update/:id", function (req, res) {
    var productId = req.params.id;

    console.log("product id: ", productId);
    console.log("req.body: ", req.body)
    var updatesObj = {};
    if (req.body.user) {
        updatesObj.user = req.body.user;
        console.log("updates obj: ", updatesObj);
    }
    if (req.body.product_name) {
        updatesObj.product_name = req.body.product_name;
        console.log("updates obj: ", updatesObj);
    }
    if (req.body.product_category) {
        updatesObj.product_category = req.body.product_category;
        console.log("updates obj: ", updatesObj);
    }
    if (req.body.product_price) {
        updatesObj.product_price = req.body.product_price;
        console.log("updates obj: ", updatesObj);
    }
    if (req.body.product_description) {
        updatesObj.product_description = req.body.product_description;
        console.log("updates obj: ", updatesObj);
    }
    if (req.body.quantity_remaining) {
        updatesObj.quantity_remaining = req.body.quantity_remaining;
        console.log("updates obj: ", updatesObj);
    }
    if (req.body.image) {
        updatesObj.image = req.body.image;
        console.log("updates obj: ", updatesObj);
    }
    console.log("update Object: ", updatesObj);

    product.update(updatesObj, productId, function (result) {
        if (result.changedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

//DELETE ITEM
router.delete("/api/products/:id", function (req, res) {
    var condition = "id = " + req.params.id;

    product.delete(condition, function (result) {
        if (result.affectedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
})

module.exports = router;