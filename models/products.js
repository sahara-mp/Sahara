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
  category: function (item, cb) {
    orm.category("products", item, function (res) {
      cb(res);
    })
  },
  topThree: function (cb) {
    orm.topThree("products", function (res) {
      cb(res);
    })
  },
  searchid: function (item, cb) {
    orm.searchid("products", item, function (res) {
      cb(res);
    })
  },
  searchProduct: function (item, cb) {
    orm.searchProduct("products", item, function (res) {
      cb(res);
    })
  },
  // The variables cols and vals are arrays.
  create: function (cols, vals, cb) {
    orm.create("products", cols, vals, function (res) {
      cb(res);
    });
  },
  update: function (objColVals, itemId, cb) {
    orm.update("products", objColVals, itemId, function (res) {
      cb(res);
    });
  },
  delete: function(condition, cb) {
    orm.delete("products", condition, function(res) {
      cb(res);
    });
  }
};

module.exports = product;
