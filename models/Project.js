module.exports = (sequelize, Sequelize) => {
	const Project = sequelize.define('Project', {
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
		discription: {
			type: Sequelize.STRING(200),
			allowNull: false
		},
        user_id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        status: {
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            type: Sequelize.BOOLEAN
        },
        like: {
            allowNull: true,
            type: Sequelize.INTEGER
        },
        dislike: {
            allowNull: true,
            type: Sequelize.INTEGER
        }
	}, { timestamps: false, freezeTableName: true })

    Project.associate = models => {
		Project.belongsToMany(models.Role, {
			as: 'roles',
			through: {
				model: models.UserRole,
				unique: false
			},
			foreignKey: 'userId',
			constraints: false
		})

		User.hasMany(models.RefreshToken, { foreignKey: 'userId' })
	}

	return Project
}
