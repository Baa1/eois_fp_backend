'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Firm', {
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
      slogan: {
        type: Sequelize.STRING,
        allowNull: false
      },
      logo: {
        type: Sequelize.STRING,
        allowNull: false
      },
      sessionId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Session',
          key: 'id'
        }
      }
    })
  },

  down: async (queryInterface) => {
    return queryInterface.dropTable('Firm')
  }
};
