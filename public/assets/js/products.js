$(function () {
    $(".product").on("click", function (event) {
        event.preventDefault();
        let productId = $(this).data("id");
        console.log(productId);
        window.location.replace(`/products/${productId}`)
    });


    $(".updateButton").on("click", function (event) {
        event.preventDefault();
        // var item = $("#search-term").val().trim();
        // console.log(item);

        var updateItem = $(this).data("id");
        console.log(updateItem);
        
    });
});

