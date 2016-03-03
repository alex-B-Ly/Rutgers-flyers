var mysql = require('mysql');
var Sequelize = require('sequelize');


// var connection = new Sequelize('rutgersflyers_db', 'root');

// var jawsConnection = mysql.createConnection(process.env.JAWSDB_URL);
// jawsConnection.connect()

if (process.env.NODE_ENV === 'production') {
  console.log(process.env.JAWSDB_URL);
  var connection  = new Sequelize(process.env.JAWSDB_URL);  
} else {
  var connection = new Sequelize('rutgersflyers_db', 'root');
}

module.exports = connection;