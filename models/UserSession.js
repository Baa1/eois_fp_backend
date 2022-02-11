module.exports = (sequelize, Sequelize) => {
    const UserSession = sequelize.define('UserSession', {
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
        sessionId: {
            type: Sequelize.INTEGER,
            references: {
              model: 'Session',
              key: 'id'
            }
        },
        roleId: {
            type: Sequelize.INTEGER,
            references: {
              model: 'Role',
              key: 'id'
            }
        }          
    }, { timestamps: false, freezeTableName: true })
  
    return UserSession
}
