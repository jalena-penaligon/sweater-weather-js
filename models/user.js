'use strict';
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
       type: DataTypes.STRING,
       unique: true,
       allowNull: false
   },
    password: DataTypes.STRING,
    api_key: DataTypes.STRING,
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };

  return User;
};
