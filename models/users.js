var Sequelize = require('sequelize');
var connection = require('../config/connection.js');
var bcrypt = require("bcryptjs");



var passhook = {
  hooks: {
    beforeCreate: function(input){
      input.password = bcrypt.hashSync(input.password, 10);
    }
  }
}

var Users = connection.define('users', 
{
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
    allowNull: false,
    unique: true,
    validate:{
      isunique: function(value, next){
        if(value){
          Users.find({ 
            where:{
              email: value
            }
          })
          .then(function(user){
            if(user){
              next('Email already exists');
            }else{
              next();
            }
          })
          .catch(function(err){
            next(err.message);
          });
        }else{
          next("String is empty");
        }
      }
    }
  },
  username:{
    type:Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password:{
    type:Sequelize.STRING,
    allowNull: false
  }
}
,passhook);

exports.Users = Users;