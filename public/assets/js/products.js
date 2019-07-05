$(function () {
    $(".product").on("click", function (event) {
        event.preventDefault();
        let productId = $(this).data("id");
        console.log(productId);
        window.location.replace(`/api/products/${productId}`)
    });

    $(".home-page-image").on("click", function (event) {
        event.preventDefault();
        // let str = this[0].alt;
        // function getSecondPart(str) {
        //     return str.split('=')[1];
        // }
    //    console.log(str);
        // console.log(getSecondPart(str));
        let productId = $(this);
        console.log(productId);
        // window.location.replace(`/products/${productId}`)
    });


    $(".updateButton").on("click", function (event) {
        event.preventDefault();
        var updateItem = $(this).data("id");
        console.log("update Item Id: ", updateItem);
        window.location.replace(`/api/products/update/${updateItem}`)

    });

    $("#updateButtonItem").on("click", function (event) {
        event.preventDefault();
        var updatesObj = {};
        let id = $("#id").val().trim();
        let user = $("#user").val().trim();
        let product_name = $("#product_name").val().trim();
        let product_category = $("#product_category").val().trim();
        let product_price = $("#product_price").val().trim();
        let product_description = $("#product_description").val().trim();
        let quantity_remaining = $("#quantity_remaining").val().trim();
        let image = $("#image").val().trim();



        console.log("this is the user info: ", user);
        console.log("this is the id info: ", id);
        console.log("this is the product_name info: ", product_name);
        console.log("this is the product_category info: ", product_category);
        console.log("this is the product_price info: ", product_price);
        console.log("this is the product_description info: ", product_description);
        console.log("this is the quantity_remaining info: ", quantity_remaining);
        console.log("this is the image info: ", image);

        if (user) {
            console.log("this is the if statement user info");
            updatesObj.user = user;
            console.log("updates obj: ", updatesObj);
        }
        if (product_name) {
            updatesObj.product_name = product_name;
            console.log("updates obj: ", updatesObj);
        }
        if (product_category) {
            updatesObj.product_category = product_category;
            console.log("updates obj: ", updatesObj);
        }
        if (product_price) {
            updatesObj.product_price = product_price;
            console.log("updates obj: ", updatesObj);
        }
        if (product_description) {
            updatesObj.product_description = product_description;
            console.log("updates obj: ", updatesObj);
        }
        if (quantity_remaining) {
            updatesObj.quantity_remaining = quantity_remaining;
            console.log("updates obj: ", updatesObj);
        }
        if (image) {
            updatesObj.image = image;
            console.log("updates obj: ", updatesObj);
        }
        $.ajax("/api/update/" + id, {
            type: "PUT",
            data: updatesObj
        }).then(
            function () {
                console.log("successfully update item");
                alert("Successfully updated!");
                window.location.replace(`/api/products/${id}`);
            }
        );

    })

    $(".deleteButton").on("click", function (event) {
        event.preventDefault();

        let id = $(this).data("id");
        $.ajax("/api/products/" + id, {
            type: "DELETE"
        }).then(
            function () {
                alert("Successfully deleted!")
                window.location.replace(`/`);
            }
        )
    });

    $(".buyButton").on("click", function (event) {
        event.preventDefault();

        window.location.replace(`/purchase`);
    });

    $(".go-back-button").on("click", function (event) {
        event.preventDefault();

        window.history.back();
    })
});

