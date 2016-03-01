var Sequelize = require('sequelize');
var connection = require('../config/connection.js');
var bcrypt = require("bcryptjs");

var userskeys = {
  f_name:{
    type:Sequelize.STRING,
    allowNull: false
  },
  l_name:{
    type:Sequelize.STRING,
    allowNull: false
  },
  email:{
    type:Sequelize.STRING,
    allowNull: false
  },
  username:{
    type:Sequelize.STRING,
    allowNull: false
  },
  password:{
    type:Sequelize.STRING,
    allowNull: false
  }
}

var passhook = {
  hooks: {
    beforeCreate: function(input){
      input.password = bcrypt.hashSync(input.password, 10);
    }
  }
}

var Users = connection.define('users', userskeys, passhook);

exports.Users = Users;