module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Role', {
      id: {
        type: Sequelize.SMALLINT,
        primaryKey: true,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true
      }
    }).then(() => {
      queryInterface.bulkInsert('Role', [
        { name: 'guest' },
        { name: 'admin' },
        { name: 'curator' },
        { name: 'participant' }
      ])
    })
  },

  down: async (queryInterface) => {
    return queryInterface.dropTable('Role')
  }
}
