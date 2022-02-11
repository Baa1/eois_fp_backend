module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define('Role', {
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
    }, { timestamps: false, freezeTableName: true })

    Role.associate = models => {  
        
    }

    return Role
}
