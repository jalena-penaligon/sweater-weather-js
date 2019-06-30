'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('CurrentWeathers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      daySummary: {
        type: Sequelize.STRING
      },
      dayIcon: {
        type: Sequelize.STRING
      },
      summary: {
        type: Sequelize.STRING
      },
      icon: {
        type: Sequelize.STRING
      },
      precipIntensity: {
        type: Sequelize.FLOAT
      },
      precipProbability: {
        type: Sequelize.FLOAT
      },
      temperature: {
        type: Sequelize.FLOAT
      },
      humidity: {
        type: Sequelize.FLOAT
      },
      pressure: {
        type: Sequelize.FLOAT
      },
      windSpeed: {
        type: Sequelize.FLOAT
      },
      windGust: {
        type: Sequelize.FLOAT
      },
      windBearing: {
        type: Sequelize.INTEGER
      },
      cloudCover: {
        type: Sequelize.FLOAT
      },
      visibility: {
        type: Sequelize.FLOAT
      },
      LocationId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {         // CurrentWeather belongsTo Location 1:1
          model: 'Locations',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('CurrentWeathers');
  }
};
