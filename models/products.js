let orm = require("../config/orm.js");

var product = {
  all: function (cb) {
    orm.all("products", function (res) {
      cb(res);
    });
  },
  search: function (item, cb) {
    orm.search("products", item, function (res) {
      cb(res);
    })
  },
  // The variables cols and vals are arrays.
  create: function (cols, vals, cb) {
    orm.create("products", cols, vals, function (res) {
      cb(res);
    });
  },
  update: function (objColVals, condition, cb) {
    orm.update("products", objColVals, condition, function (res) {
      cb(res);
    });
  },
  // delete: function(){
  //   orm.delete("products")
  // }
};

// var user = {
//   all: function (cb) {
//     orm.all("EmailAndPassword", function (res) {
//       cb(res);
//     });
//   },
//   // The variables cols and vals are arrays.
//   create: function (cols, vals, cb) {
//     orm.create("EmailAndPassword", cols, vals, function (res) {
//       cb(res);
//     });
//   },
//   update: function (objColVals, condition, cb) {
//     orm.update("EmailAndPassword", objColVals, condition, function (res) {
//       cb(res);
//     });
//   },
//   // delete: function(){
//   //   orm.delete("EmailAndPassword")
//   // }
// };

module.exports = product;
