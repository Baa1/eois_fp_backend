module.exports = (sequelize, Sequelize) => {
    const ProjectSession = sequelize.define('ProjectSession', {
        id: {
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            type: Sequelize.INTEGER
        },
        projectId: {
            type: Sequelize.INTEGER,
            references: {
              model: 'Project',
              key: 'id'
            }
        },
        sessionId: {
            type: Sequelize.SMALLINT,
            references: {
              model: 'Session',
              key: 'id'
            }
        }        
    }, { timestamps: false, freezeTableName: true })
  
    return ProjectSession
}
