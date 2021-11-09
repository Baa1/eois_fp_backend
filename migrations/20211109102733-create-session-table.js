module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Session', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      dateStart: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      dateEnd: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      place: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      }
    })
  },

  down: async (queryInterface) => {
    return queryInterface.dropTable('Session')
  }
};
