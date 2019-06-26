'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Users', [{
      email: 'user1@email.com',
      password: '123456',
      api_key: '4044100531',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      email: 'user2@email.com',
      password: 'qwerty',
      api_key: '7957081037',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      email: 'user3@email.com',
      password: 'password',
      api_key: '9862924139',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      email: 'user4@email.com',
      password: 'abc123',
      api_key: '1775638765',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
