'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
      return queryInterface.createTable('ProjectSession', {
        id: {
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
          type: Sequelize.INTEGER
        },
        projectId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Project',
            key: 'id'
          }
        },
        sessionId: {
          type: Sequelize.SMALLINT,
          references: {
            model: 'Session',
            key: 'id'
          }
        }
      })
  },

  down: async (queryInterface) => {
    return queryInterface.dropTable('ProjectSession')
  }
};
