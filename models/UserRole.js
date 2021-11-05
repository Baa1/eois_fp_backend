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
            allowNull: false
        },
        roleId: {
            type: Sequelize.SMALLINT,
            allowNull: false
        }        
    }, { timestamps: false })
  
    return UserRole
}
