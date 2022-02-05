module.exports = (sequelize, Sequelize) => {
	const User = sequelize.define('User', {
		id: {
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            type: Sequelize.INTEGER
        },
		email: {
			type: Sequelize.STRING(100),
			allowNull: false,
			unique: true
		},
		password: {
			type: Sequelize.STRING(100),
			allowNull: false
		}
	}, { timestamps: false, freezeTableName: true })

	User.associate = models => {
		User.belongsToMany(models.Role, {
			as: 'roles',
			through: {
				model: models.UserRole,
				unique: false
			},
			foreignKey: 'userId',
			constraints: false
		})

		User.belongsToMany(models.Session, {
			as: 'sessions',
			through: {
				model: models.UserSession,
				unique: false
			},
			foreignKey: 'userId',
			constraints: false
		})

		User.hasMany(models.RefreshToken, { foreignKey: 'userId' })
	}

	return User
}
