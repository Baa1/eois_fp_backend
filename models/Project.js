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
		description: {
			type: Sequelize.TEXT,
			allowNull: false
		},
        creatorId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'User',
                key: 'id'
            }
        },
        status: {
            allowNull: false,
            type: Sequelize.STRING
        },
        likes: {
            allowNull: true,
            type: Sequelize.INTEGER
        },
        dislikes: {
            allowNull: true,
            type: Sequelize.INTEGER
        }
	}, { timestamps: false, freezeTableName: true })

    Project.associate = models => {
		Project.belongsToMany(models.Session, {
			as: 'session',
			through: {
				model: models.ProjectSession,
				unique: false
			},
			foreignKey: 'projectId',
			constraints: false
		})
	}

	return Project
}
