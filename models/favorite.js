'use strict';
module.exports = (sequelize, DataTypes) => {
  const Favorite = sequelize.define('Favorite', {
    userId: DataTypes.INTEGER,
    locationId: DataTypes.INTEGER
  }, {});
  Favorite.associate = function(models) {

  };
  return Favorite;
};
