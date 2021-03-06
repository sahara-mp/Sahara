// Import MySQL connection.
var config = require("./config.js");

function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
  console.log("this is ob", ob);
  var arr = [];

  // loop through the keys and push the key/value as a string int arr
  for (var key in ob) {
    var value = ob[key];
    // check to skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {
      // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }

      arr.push(key + "=" + value);
    }
  }

  // translate array of strings to a single comma-separated string
  return arr.toString();
}

// Object for all our SQL statement functions.
var orm = {
  all: function (tableInput, cb) {
    var queryString = "SELECT * FROM " + tableInput + ";";
    config.query(queryString, function (err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  search: function (tableInput, item, cb) {
    var queryString = `SELECT * FROM ${tableInput} WHERE CONCAT(PRODUCT_NAME, PRODUCT_CATEGORY, PRODUCT_DESCRIPTION) LIKE '%${item}%';`;
    var searchQuery = config.query(queryString, item, function (err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  searchid: function (tableInput, item, cb) {
    var queryString = `SELECT * FROM ${tableInput} WHERE id = ${item};`;
    var searchQuery = config.query(queryString, item, function (err, result) {
      if (err) {
        throw err;
      }
      cb(result[0]);
    });
  },
  searchProduct: function (tableInput, item, cb) {
    var queryString = `SELECT * FROM ${tableInput} WHERE PRODUCT_NAME = ${item};`;
    var searchQuery = config.query(queryString, item, function (err, result) {
      if (err) {
        throw err;
      }
      cb(result[0]);
    });
  },
  searchHistory: function (tableInput, item, cb) {
    console.log("this is orm item: ", item);

    var queryString = "SELECT * FROM " + tableInput;
    queryString += " WHERE PRODUCT_NAME in " 
    queryString += "( ";
    queryString += printQuestionMarks(item.length);
    queryString += " )";
    queryString += ";"
    // var queryString = `SELECT * FROM ${tableInput} WHERE PRODUCT_NAME = ?;`

    console.log(queryString);
    var searchQuery = config.query(queryString, item, function (err, result) {
      
      if (err) {
        throw err;
      }
      console.log("this is the searchHistory searchQuery: ", searchQuery);
      cb(result);
    });
  },
  topThree: function (tableInput, cb) {
    var queryString = `SELECT * FROM ${tableInput} ORDER BY quantity_remaining DESC LIMIT 3;`;
    var searchQuery = config.query(queryString, function (err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  category: function (tableInput, item, cb) {
    var queryString = `SELECT * FROM ${tableInput} WHERE PRODUCT_CATEGORY = '${item}';`;
    var searchQuery = config.query(queryString, item, function (err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  userPage: function (table, user, cb) {
    var queryString = `SELECT * FROM ${table} WHERE UserEmail = '${user}';`;
    var searchQuery = config.query(queryString, user, function (err, result) {
      if (err) {
        throw err;
      }
      cb(result[0]);
    });
  },
  selling: function (table1, table2, user, cb) {
    console.log("this is orm selling user Email:", user);

    var queryString = `SELECT ${table1}.UserFullName, ${table2}.* FROM ${table1} LEFT JOIN ${table2} ON ${table1}.UserFullName = ${table2}.user WHERE ${table1}.UserFullName = '${user}';`

    console.log("this is the login query string: ", queryString);
    var searchQuery = config.query(queryString, user, function (err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  create: function (table, cols, vals, cb) {
    var queryString = "INSERT INTO " + table;

    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(vals.length);
    queryString += ") ";

    console.log(queryString);

    config.query(queryString, vals, function (err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },
  update: function (table, objColVals, itemId, cb) {
    console.log("this is columns: ", objColVals);
    console.log("this is itemId: ", itemId);

    var queryString = "UPDATE " + table;

    queryString += " SET ";
    queryString += objToSql(objColVals);
    queryString += " WHERE id=";
    queryString += itemId;

    console.log("this is the column translation: ", objToSql(objColVals));

    console.log("this is the querystring: ", queryString);
    config.query(queryString, function (err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },
  delete: function (table, condition, cb) {
    var queryString = "DELETE FROM " + table;
    queryString += " WHERE ";
    queryString += condition;

    config.query(queryString, function (err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },
  login: function (table, userLogin, cb) {
    console.log("this is orm userEmail:", userLogin[0]);
    console.log("this is orm userpassword: ", userLogin[1]);

    var queryString = `SELECT * FROM ${table} WHERE UserEmail = ? && UserPassword = ?`;

    console.log("this is the login query string: ", queryString);
    var searchQuery = config.query(queryString, userLogin, function (err, result) {
      if (err) {
        throw err;
      }
      cb(result[0]);
    });
  },
  buy: function (table, user, item, cb) {
    console.log("orm user:", user);
    console.log("orm item: ", item);

    var queryString = `INSERT INTO ${table} (buyer, item) VALUES ('${user}', '${item}');`
    console.log("this is the querystring: ", queryString);
    config.query(queryString, function (err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });

  },
  buyerHistory: function (table, user, cb){
    console.log("this is buyHistory user", user);
    var queryString = `SELECT * from ${table} WHERE buyer = '${user}';`
    config.query(queryString, function (err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },
  updateQuantity: function (table, item, cb) {
    console.log("this is itemId: ", item);

    var queryString = `UPDATE ${table} SET quantity_remaining = quantity_remaining - 1 WHERE id =  '${item}';`;

    console.log("this is the querystring: ", queryString);
    config.query(queryString, function (err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  }


};

// Export the orm object for the model (cat.js).
module.exports = orm;
