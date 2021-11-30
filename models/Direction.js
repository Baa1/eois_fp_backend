module.exports = (sequelize, Sequelize) => {
    const Direction = sequelize.define('Direction', {
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
    
    return Direction
}