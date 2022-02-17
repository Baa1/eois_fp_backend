'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Todo',
      'completed',
     Sequelize.BOOLEAN
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Todo',
      'completed'
    );
  }
};
