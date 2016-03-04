var env = require('dotenv').config({ silent: true });
var mysql = require('mysql');
var Sequelize = require('sequelize');


// var connection = new Sequelize('rutgersflyers_db', 'root');

// var jawsConnection = mysql.createConnection(process.env.JAWSDB_URL);
// jawsConnection.connect()

console.log(process.env.NODE_ENV);
console.log(process.env.JAWSDB_URL);

if (process.env.NODE_ENV === 'production') {

  var connection  = new Sequelize(process.env.JAWSDB_URL);  
} else {
  var connection = new Sequelize('rutgersflyers_db', 'root');
}

module.exports = connection;