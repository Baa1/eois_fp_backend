'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Direction', {
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
      queryInterface.bulkInsert('Direction', [
        { name: 'Unity VR' },
        { name: 'Unity AR' },
        { name: 'Web-разработка' },
        { name: 'Pyton' },
        { name: 'Дизайн 2D' },
        { name: 'Дизайн 3D' }, 
        { name: 'Реклама' }
      ])
    })
  },

  down: async (queryInterface) => {
    return queryInterface.dropTable('Direction')
  }
}
