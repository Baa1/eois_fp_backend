module.exports = (sequelize, Sequelize) => {
    const UserRole = sequelize.define('UserRole', {
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
        roleId: {
            type: Sequelize.SMALLINT,
            references: {
              model: 'Role',
              key: 'id'
            }
        }        
    }, { timestamps: false, freezeTableName: true })
  
    return UserRole
}
