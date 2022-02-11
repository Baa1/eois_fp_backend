'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('UserSession', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'User',
          key: 'id'
        }
      },
      sessionId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Session',
          key: 'id'
        }
      },
      roleId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Role',
          key: 'id'
        }
    }  
    })
  },

  down: async (queryInterface) => {
    return queryInterface.dropTable('UserSession')
  }
};
