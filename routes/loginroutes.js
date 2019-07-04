// exports.register = function(req,res){
//     var today = new Date();
//     var users={
//       "email":req.body.email,
//       "password":req.body.password,
//       "created":today,
//       "modified":today
//     }
//     connection.query('INSERT INTO EmailAndPassword SET ?',users, function (error, results, fields) {
//     if (error) {
//       console.log("error ocurred",error);
//       res.send({
//         "code":400,
//         "failed":"error ocurred"
//       })
//     }else{
//       console.log('The solution is: ', results);
//       res.send({
//         "code":200,
//         "success":"user registered sucessfully"
//           });
//     }
//     });
//   }