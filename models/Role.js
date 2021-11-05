module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define('roles', {
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
    }, { timestamps: false })

    Role.associate = models => {  
        Role.belongsToMany(models.User, {
          as: 'users',
          through: {
            model: models.UserRole,
            unique: false
          },
          foreignKey: 'roleId',
          constraints: false
        })
    }

    return Role
}
