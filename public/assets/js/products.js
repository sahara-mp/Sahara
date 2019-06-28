$(function () {
  $("form").on("submit", function (event) {
    event.preventDefault();
    var item = $("#search-term").val().trim();
    console.log(item);
    // Send the GET request.
    $.ajax("/api/" + item, {
      type: "GET",
      data: item
    }).then(
      function () {
        console.log("Item has been found!");
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });
});

$(function () {
  $("#submitButton").on("click", function (event) {
    var id = $("form").data("id");
    console.log(id);
    // Send the PUT request.
    // $.ajax("/api/" + item, {
    //   type: "GET",
    //   data: item
    // }).then(
    //   function () {
    //     console.log("Item has been found!");
    //     // Reload the page to get the updated list
    //     location.reload();
    //   }
    // );
  });
});