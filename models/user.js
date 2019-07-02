let orm = require("../config/orm.js");

var user = {
    all: function (cb) {
      orm.all("EmailAndPassword", function (res) {
        cb(res);
      });
    },
    userPage: function (user, cb) {
      orm.userPage("EmailAndPassword", user, function (res) {
        cb(res);
      });
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
    // delete: function(){
    //   orm.delete("EmailAndPassword")
    // }
  };

module.exports = user;