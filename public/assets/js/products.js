$(function () {
  $(this).on("click", function (event) {
    event.preventDefault();
    // var item = $("#search-term").val().trim();
    // console.log(item);

    var updateItem =  $(this).data("id");
    console.log(updateItem);
    // //Why is this item and not product_name?
    // console.log(searchItem);
    // // Send the GET request.
    // $.ajax("/api/search/" + searchItem, {
    //   type: "POST",
    //   data: searchItem
    // }).then(
    //   function () {
    //     console.log("Item has been found!");
    //     // Reload the page to get the updated list
    //     // location.reload();
    //   }
    // );
  });
});

