$(function () {
    $(".product").on("click", function (event) {
        event.preventDefault();
        let productId = $(this).data("id");
        console.log(productId);
        window.location.replace(`/api/products/${productId}`)
    });


    $(".updateButton").on("click", function (event) {
        event.preventDefault();
        var updateItem = $(this).data("id");
        console.log("update Item Id: ", updateItem);
        window.location.replace(`/api/products/update/${updateItem}`)
        
    });

    $("#updateButtonItem").on("click", function (event){
        event.preventDefault();
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

        if (user == ""){
            
        }
        // $.ajax("/api/update/" + id, {
        //     type: "PUT",
        //     data: newSleepState
        //   }).then(
        //     function() {
        //       console.log("changed sleep to", newSleep);
        //       // Reload the page to get the updated list
        //       location.reload();
        //     }
        //   );

    })

    $(".deleteButton").on("click", function (event) {
        event.preventDefault();

        let id = $(this).data("id");
        $.ajax("/api/products/" + id, {
          type: "DELETE"
        }).then(
          function () {
            location.reload();
          }
        )
    });
});

