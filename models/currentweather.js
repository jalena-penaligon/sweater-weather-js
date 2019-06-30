'use strict';
module.exports = (sequelize, DataTypes) => {
  const CurrentWeather = sequelize.define('CurrentWeather', {
    daySummary: DataTypes.STRING,
    dayIcon: DataTypes.STRING,
    summary: DataTypes.STRING,
    icon: DataTypes.STRING,
    precipIntensity: DataTypes.FLOAT,
    precipProbability: DataTypes.FLOAT,
    temperature: DataTypes.FLOAT,
    humidity: DataTypes.FLOAT,
    pressure: DataTypes.FLOAT,
    windSpeed: DataTypes.FLOAT,
    windGust: DataTypes.FLOAT,
    windBearing: DataTypes.INTEGER,
    cloudCover: DataTypes.FLOAT,
    visibility: DataTypes.FLOAT,
    LocationId: DataTypes.INTEGER
  }, {});
  CurrentWeather.associate = function(models) {
    CurrentWeather.belongsTo(models.Location, {foreignKey: 'LocationId', as: 'location'})
  };
  return CurrentWeather;
};
