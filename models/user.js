let orm = require("../config/orm.js");

var user = {
    search: function (cb) {
      orm.all("EmailAndPassword", function (res) {
        cb(res);
      });
    },
    userPage: function (user, cb) {
      orm.userPage("EmailAndPassword", user, function (res) {
        cb(res);
      });
    },
    login: function(userLogin, cb){ 
      orm.login("EmailAndPassword", userLogin, function (res){
        cb(res);
      })
    },
    selling: function(userEmail, cb){ 
      orm.selling("EmailAndPassword", "products", userEmail, function (res){
        cb(res);
      })
    },
    // The variables cols and vals are arrays.
    create: function (cols, vals, cb) {
      orm.create("EmailAndPassword", cols, vals, function (res) {
        cb(res);
      });
    },
    update: function (objColVals, condition, cb) {
      orm.update("EmailAndPassword", objColVals, condition, function (res) {
        cb(res);
      });
    },

    // update: function (objColVals, condition, cb) {
    //   orm.update("products", objColVals, condition, function (res) {
    //     // UPDATE prodcuts SET Quantity = Quantity - 1 WHERE      });
    // },


    // delete: function(){
    //   orm.delete("EmailAndPassword")
    // }
  };

module.exports = user;