const express = require("express");
let product = require("../models/products.js");
let user = require("../models/user.js");
// let category = require("../public/assets/js/categories.js");

var router = express.Router();
var sess;


//HOME PAGE
router.get("/", function (req, res) {
    sess = req.session;
    if (sess.email) {
        console.log("there is an email assigned!");
        // return res.redirect('/admin');
    }
    console.log("this is index sess: ", sess);
    product.topThree(function (data) {
        var hbsObject = {
            "products": data,
            "test": "testing",
            session: sess
        };
        console.log("ViewModel", hbsObject);
        res.render("index", hbsObject);
    });
});

// DISPLAYS ALL ITEMS
router.get("/api/search/all", function (req, res) {
    product.all(function (data) {
        var hbsObject = {
            products: data,
            session: sess
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
            var hbsObject = {
                products: data,
                session: sess
            };
            res.render("index", hbsObject);
        }
    });
});

//CATEGORIES DROPDOWN
router.get("/categories/:category", function (req, res) {
    var category = req.params.category;
    console.log('and the category is', category);
    product.category(category, function (data) {
        var hbsObject = {
            products: data,
            session: sess
        };
        res.render("index", hbsObject);
    });
});

//NO PRODUCT PAGE
router.get("/noProduct", function (req, res) {
    res.render("noProduct", {session: sess});
});

//LOGIN PAGE
router.get("/login", function (req, res) {
    res.render("login", {session: sess});
});

//ABOUT PAGE
router.get("/about", function (req, res) {
    res.render("about", {session: sess});
});

//CONTACT PAGE
router.get("/contact", function (req, res) {
    res.render("contact", {session: sess});
});

//USER PROFILE PAGE 
router.get("/userProfile", function (req, res) {
    res.render("profile", {session: sess});
})

//SIGN UP PAGE
router.get("/signup", function (req, res) {
    res.render("signup", {session: sess});
});

//PURCHASE PAGE
router.get("/purchase/:id", function (req, res) {
    console.log(req.params.id);
    product.searchid(req.params.id, function (data) {
        // console.log(data.product_name);
        if (!data) {
            res.render("noProduct");
        } else {
            var purchaseObject = {
                product: data,
                session: sess
            };
            res.render("purchase", purchaseObject);
        }
    });
});

router.post("/finalPurchase", function (req, res) {
    console.log("this is final purchase request body: ", req.body);
    console.log("this is final purchase session: ", sess);
    product.searchid(req.body.id, function (data) {
        console.log("this is purchase data: ", data);
        if (data.quantity_remaining <= 0) {
            res.render("soldOut", { session: sess });
        } else {
            let productName = data.product_name;
            user.userPage(req.body.UserEmail, function (data){
                user.buy(data.UserFullName, productName, function (data) {
                    console.log("this is user buy data: ", data);
                    product.updateQuantity(req.body.id, function (data) {
                        console.log("this is the purchase data: ", data);
                        res.redirect("/confirmation");
                    })
                })
            })
        }
    });
})

//PURCHASE CONFIRMATION PAGE
router.get("/confirmation", function (req, res) {
    res.render("confirmation", {session: sess});
});

//ORDER HISTORY PAGE
router.get("/orderHistory/:userEmail", function (req, res) {
    let userEmail = req.params.userEmail;
    console.log("this is userEmail", userEmail);
    user.userPage(userEmail, function (data) {
        console.log("this is userEmail data: ", data)
        let userName = data.UserFullName;
        user.buyerHistory(userName, function (data) {
            console.log("this is buyerhistory data: ", data);
            if (data.length < 1) {
                console.log("this is hitting the nothingOrdered if statement");
                res.render("noOrderHistory", {session: sess});
            } else {
                var itemsNameArray = [];
                for (var i = 0; i < data.length; i++) {
                    itemsNameArray.push(data[i].item);
                }
                console.log("this is the itemsNameArray", itemsNameArray);
                product.searchHistory(itemsNameArray, function (data) {
                    console.log("this is each item name object: ", data);
                    var hbsObject = {
                        products: data,
                        session: sess
                    };
                    res.render("orderhistory", hbsObject);
                })
            }

        })

    })
});

router.get("/sellingItems/:user", function (req, res) {
    let userEmail = req.params.user;
    user.userPage(userEmail, function (data) {
        console.log("this is seller profile data: ", data);
        let userName = data.UserFullName;
        user.selling(userName, function (data) {
            console.log("this is selling data: ", data);
            var sellerItemsObj = {
                products: data,
                session: sess,
            }
            console.log(sellerItemsObj);
            let sellerDataArray = data.length;
            console.log("sellerDataArray Length: ", sellerDataArray);
            if (data[0].id == null) {
                res.render("noItemsSelling", {session: sess});
            } else {
                res.render("sellingItems", sellerItemsObj);
            }
        })
    })


})

//ADD ITEMS PAGE
router.get("/addItems", function (req, res) {
    user.userPage(sess.email, function (data) {
        console.log("this is userProfile data: ", data)
        console.log("this is userProfile sess: ", sess);
        var userObj = {
            userInfo: data,
            session: sess,
        }
        res.render("addItems", userObj);
    })

});

//PRODUCTS PAGE
router.get("/products", function (req, res) {
    res.render("products", {session: sess});
});

//GET PRODUCT ID FOR ON CLICK FUNCTION
router.get("/api/products/:product", function (req, res) {
    console.log(req.params.product);
    product.searchid(req.params.product, function (data) {
        // console.log(data.product_name);
        if (!data) {
            res.render("noProduct");
        } else {
            var productObject = {
                product: data,
                session: sess
            };
            res.render("products", productObject);
        }
    });
});

//UPDATE PRODUCT
router.get("/api/products/update/:product", function (req, res) {
    console.log("this is req.params.product: ", req.params.product);
    product.searchid(req.params.product, function (data) {
        console.log(data);
        var productObject = {
            product: data,
            session: sess
        };
        res.render("updateProduct", productObject);
    });
});

//CREATE NEW USER
router.post("/api/EmailAndPassword", function (req, res) {
    console.log("this is req.body.UserEmail:", req.body.UserEmail);
    sess = req.session;
    user.userPage(req.body.UserEmail, function (data) {
        console.log("this is UserPage data: ", data);
        if (data) {
            let userExists = {
                exists: "This User Already Exists",
            }
            console.log("This User Exists")
            res.render("signup", {userExists: userExists})
        } else {
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
                    user.userPage(req.body.UserEmail, function (data) {
                        console.log("this is login data: ", data)

                        // res.render("profile", { userInfo: data });
                        sess.email = req.body.UserEmail;
                        console.log("create user session email: ", sess.email);
                        res.redirect(`/api/userProfile/${req.body.UserEmail}`);

                    });
                    //login function bypassing checking password
                });
        }
    })

});

// user login
router.post("/api/login", function (req, res) {
    console.log(req.body);
    sess = req.session;

    let UserEmail = req.body.UserEmail;
    let UserPassword = req.body.UserPassword;
    console.log("UserEmail: ", UserEmail);
    console.log("UserPass: ", UserPassword);
    let userLogin = [UserEmail, UserPassword]
    console.log("this is userLogin", userLogin);
    user.login(userLogin, function (data) {
        console.log("this is login data: ", data)
        if (!data) {
            let badLogin = {
                badLogin: "The Email or Password entered is incorrect",
                session: sess
            }
            res.render("login", { badLogin: badLogin });
        } else {
            // res.render("profile", { userInfo: data });
            sess.email = req.body.UserEmail;
            console.log("this is sess", sess.email);
            res.redirect(`/api/userProfile/${UserEmail}`);
        }
    });
});

//render userprofile
router.get("/api/userProfile/:user", function (req, res) {
    let userEmail = req.params.user;
    user.userPage(userEmail, function (data) {
        console.log("this is userProfile data: ", data)
        console.log("this is userProfile sess: ", sess);
        var userObj = {
            userInfo: data,
            session: sess,
        }
        res.render("profile", userObj);
    })
})

//logout function
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return console.log(err);
        }
        res.redirect('/');
    });

});



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
        console.log("this is new item data", data);
        if (data.length > 0) {
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
                    res.redirect(`/api/products/${result.insertId}`);
                    // res.render("products", { product: newItem });

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