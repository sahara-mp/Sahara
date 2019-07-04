// $(function () {
//     $("#loginButton").on("click", function (event){
//         event.preventDefault();

//         let email = $("#UserEmail").val().trim();
//         let password = $("#UserPassword").val().trim();

//         if (!email || !password){
//             alert("Please do not leave email or password blank");
//         } else {
//             var loginObj = {
//                 UserEmail : email,
//                 UserPassword: password
//             }
//         }
        
//         console.log("this is the user email: ", email);
//         console.log("this is the user password: ", password);

//         console.log("this is the loginObj info: ", loginObj);

//         $.ajax("/login" + id, {
//             type: "PUT",
//             data: updatesObj
//           }).then(
//             function() {
//               console.log("successfully update item");
//               // Reload the page to get the updated list
//               location.reload();
//             }
//           );

//     })

// });
