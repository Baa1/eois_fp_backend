const moment = require('moment')
module.exports = (sequelize, Sequelize) => {
    const Entry = sequelize.define('Entry', {
        id: {
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            type: Sequelize.INTEGER
        },
        sessionId: {
            type: Sequelize.INTEGER,
            references: {
              model: 'Session',
              key: 'id'
            }
        },
        participantName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        participantSurname: {
            type: Sequelize.STRING,
            allowNull: false
        },
        participantPatronymic: {
            type: Sequelize.STRING,
            allowNull: false
        },
        participantEmail: {
            type: Sequelize.STRING,
            allowNull: false
        },
        participantBirthday: {
            type: Sequelize.DATEONLY,
            allowNull: false,
            get() {
				let date = this.getDataValue("participantBirthday")
				return date ? moment(date, "YYYY-MM-DD").format("DD.MM.YYYY") : null
			}
        },
        participantGender: {
            type: Sequelize.STRING,
            allowNull: false
        },
        parentName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        parentSurname: {
            type: Sequelize.STRING,
            allowNull: false
        },
        parentPatronymic: {
            type: Sequelize.STRING,
            allowNull: false
        },
        parentEmail: {
            type: Sequelize.STRING,
            allowNull: false
        },
        parentPhone: {
            type: Sequelize.STRING,
            allowNull: false
        },
        status: {
            type: Sequelize.STRING,
            allowNull: false
        },
		createdAt: {
			type: Sequelize.DATE,
			allowNull: false,
			get() {
				let date = this.getDataValue("createdAt")
				return date ? moment(date).format("DD.MM.YYYY HH:mm:ss") : null
			}
		},
		updatedAt: {
			type: Sequelize.DATE,
			allowNull: false,
			get() {
				let date = this.getDataValue("createdAt")
				return date ? moment(date).format("DD.MM.YYYY HH:mm:ss") : null
			}
		},
    }, { timestamps: true, freezeTableName: true })

    return Entry
}
