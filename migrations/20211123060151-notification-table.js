'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Notification', {
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
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      text: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        get() {
          let date = this.getDataValue("createdAt")
          return date ? moment(date).format("DD.MM.YYYY HH:mm:ss") : null
        }
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        get() {
          let date = this.getDataValue("createdAt")
          return date ? moment(date).format("DD.MM.YYYY HH:mm:ss") : null
        }
      },
    })
  },

  down: async (queryInterface) => {
    return queryInterface.dropTable('Notification')
  }
};
