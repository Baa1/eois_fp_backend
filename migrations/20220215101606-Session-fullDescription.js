'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Session', 'fullDescription',
        {
          type: Sequelize.TEXT,
          allowNull: true
        }
    )
  },

  down: async (queryInterface) => {
    return queryInterface.removeColumn('Session', 'fullDescription')
  }
};
