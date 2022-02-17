module.exports = (sequelize, Sequelize) => {
	const Session = sequelize.define('Session', {
		id: {
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            type: Sequelize.INTEGER
        },
		dateStart: {
			type: Sequelize.DATEONLY,
			allowNull: false
		},
		dateEnd: {
			type: Sequelize.DATEONLY,
			allowNull: false
		},
        place: {
            type: Sequelize.STRING,
            allowNull: false
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: true
        },
		fullDescription: {
            type: Sequelize.TEXT,
            allowNull: true
        }
	}, { timestamps: false, freezeTableName: true })

	Session.associate = models => {
		Session.belongsToMany(models.Project, {
			as: 'projects',
			through: {
				model: models.ProjectSession,
				unique: false
			},
			foreignKey: 'sessionId',
			constraints: false
		})
	}

	Session.associate = models => {
		Session.belongsToMany(models.User, {
			as: 'users',
			through: {
				model: models.UserSession,
				unique: false
			},
			foreignKey: 'sessionId',
			constraints: false
		})

		Session.hasMany(models.Entry, { foreignKey: 'sessionId' })
	}

	return Session
}
