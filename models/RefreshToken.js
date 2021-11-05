const { v4: uuidv4 } = require('uuid')

module.exports = (sequelize, Sequelize) => {
    const RefreshToken = sequelize.define('RefreshToken', {
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
        },
    }, { timestamps: false, freezeTableName: true })

    RefreshToken.createToken = async function (user, transaction) {
        const expiredAt = new Date()
        expiredAt.setSeconds(expiredAt.getSeconds() + process.env.REFRESH_TOKEN_DURATION)
        const _token = uuidv4()
        const refreshToken = await this.create({
            token: _token,
            userId: user.id,
            expiryDate: expiredAt.getTime(),
        }, { transaction })
        return refreshToken.token
    }

    RefreshToken.verifyExpiration = (token) => {
        return token.expiryDate.getTime() < new Date().getTime()
    }

    RefreshToken.associate = models => {
        RefreshToken.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user'
        })
    }

    return RefreshToken
}
