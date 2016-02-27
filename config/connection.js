var Sequelize = require('sequelize');

var connection = new Sequelize('rutgersplace_db', 'root');

module.exports = connection;