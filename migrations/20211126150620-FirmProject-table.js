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
      },
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
    return queryInterface.dropTable('Project')
  }
};
