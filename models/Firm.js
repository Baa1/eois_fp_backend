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
        participantId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'User',
                key: 'id'
            }
        },
        projectId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'Project',
                key: 'id'
            }
        },
        // photoId: {
            
        // }   
	}, { timestamps: false, freezeTableName: true })

    // Firm.associate = models => {
		
	// }

	return Firm
}

