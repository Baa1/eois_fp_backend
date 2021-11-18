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
      participantId: {
          type: Sequelize.INTEGER,
          references: {
              model: 'User',
              key: 'id'
          }
      },
      projectId: {
          type: Sequelize.INTEGER,
          references: {
              model: 'Project',
              key: 'id'
          }
      },
    //photoId: {
        
    //}   
    })
  },

  down: async (queryInterface) => {
    return queryInterface.dropTable('Firm')
  }
};
