module.exports = (sequelize, Sequelize) => {
	const Firm = sequelize.define('Firm', {
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
		slogan: {
			type: Sequelize.STRING,
			allowNull: false
		},
        logo: {
            type: Sequelize.STRING,
			allowNull: false
        },
        sessionId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'Session',
                key: 'id'
            }
        }
	}, { timestamps: false, freezeTableName: true })

    Firm.associate = models => {
		Firm.belongsToMany(models.Project, {
			as: 'projects',
			through: {
				model: models.FirmProject,
				unique: false
			},
			foreignKey: 'firmId',
			constraints: false
		})
	}

	return Firm
}

