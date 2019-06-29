// $(function () {
//   $("#searchBar").on("submit", function (event) {
//     event.preventDefault();
//     // var item = $("#search-term").val().trim();
//     // console.log(item);

//     var searchItem =  $("#search-term").val().trim();
//     //Why is this item and not product_name?
//     console.log(searchItem);
//     // Send the GET request.
//     $.ajax("/api/search/" + searchItem, {
//       type: "POST",
//       data: searchItem
//     }).then(
//       function () {
//         console.log("Item has been found!");
//         // Reload the page to get the updated list
//         // location.reload();
//       }
//     );
//   });
// });

