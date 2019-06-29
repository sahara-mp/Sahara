// $(function () {
//     $(".signUpForm").on("submit", function (event) {
//         event.preventDefault();
//         var newUser = {
//             userFullName: $("#userFullName").val().trim(),
//             userEmail: $("#userEmail").val().trim(),
//             userPassword: $("#userPassword").val().trim()
//         };

//         // var newUser = $("form").data("id");
//         console.log("user: " + newUser);
//         //   Send the PUT request.
//         $.ajax("/api/EmailAndPassword", {
//             type: "POST",
//             data: newUser
//         }).then(
//             function () {
//                 console.log("New User created");
//                 // Reload the page to get the updated list
//                 location.reload();
//             }
//         );
//     });
//   });