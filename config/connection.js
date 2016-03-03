var Sequelize = require('sequelize');

var connection = new Sequelize('rutgersflyers_db', 'root');

module.exports = connection;