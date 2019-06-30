'use strict';
module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
    cityState: DataTypes.STRING,
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT
  }, {});
  Location.associate = function(models) {
    Location.hasOne(models.CurrentWeather)
  };
  return Location;
};
