module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('RefreshToken', {
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
      token: {
        type: Sequelize.STRING,
      },
      expiryDate: {
        type: Sequelize.DATE,
      }
    })
  },

  down: async (queryInterface) => {
    return queryInterface.dropTable('RefreshToken')
  }
}
