var mysql = require("mysql");
const colors = require("colors");

// let config = {
//     local: {
//         mysql: {
//             url: process.DB_URL
//         },
//         apiKeys: {}
//     },
//     prod: {
//         mysql: {
//             url: process.env.JAWSDB_URL
//         },
//         apiKeys: {}
//     }
// };

var config = mysql.createConnection({
    host: "gzp0u91edhmxszwf.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    port: 3306,
    user: "yy20bsqi5f95flj1",
    password: "c2082uc03elkz865",
    database: "uqju6zc4721rrz6v"
  });

config.connect(function(err) {
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    }
    console.log(colors.america("connected as id " + config.threadId));
  });

module.exports = config;

// [process.env.APP_ENV || 'local']