module.exports = (sequelize, Sequelize) => {
	const FirmProject = sequelize.define('FirmProject', {
		id: {
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            type: Sequelize.INTEGER
        },
        firmId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'Firm',
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
	}, { timestamps: false, freezeTableName: true })

	return FirmProject
}