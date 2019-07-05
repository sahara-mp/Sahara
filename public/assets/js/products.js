$(function () {
    $(".product").on("click", function (event) {
        event.preventDefault();
        let productId = $(this).data("id");
        console.log(productId);
        window.location.replace(`/products/${productId}`)
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
        // var item = $("#search-term").val().trim();
        // console.log(item);

        var updateItem = $(this).data("id");
        console.log(updateItem);
        // //Why is this item and not product_name?
        // console.log(searchItem);
        // // Send the GET request.
        // $.ajax("/api/search/" + updateItem, {
        //   type: "POST",
        //   data: updateItem
        // }).then(
        //   function () {
        //     console.log("Item has been found!");
        //     // Reload the page to get the updated list
        //     // location.reload();
        //   }
        // );
    });
});

