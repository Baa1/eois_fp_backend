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
	}

	return User
}
