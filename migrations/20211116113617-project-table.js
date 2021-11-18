'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Project', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      creatorId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'User',
            key: 'id'
        }
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING
      },
      likes: {
          allowNull: true,
          type: Sequelize.INTEGER
      },
      dislikes: {
          allowNull: true,
          type: Sequelize.INTEGER
      }
    })
  },

  down: async (queryInterface) => {
    return queryInterface.dropTable('Project')
  }
};
