'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('UserRole', {
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
      roleId: {
        type: Sequelize.SMALLINT,
        references: {
          model: 'Role',
          key: 'id'
        }
      }
    })
  },

  down: async (queryInterface) => {
    return queryInterface.dropTable('UserRole')
  }
};
