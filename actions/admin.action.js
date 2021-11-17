const db = require('../models')
const moment = require('moment')
const { ConflictError } = require('../utils/errors')

exports.addSession = async (res, sessionData) => {
    await db.transaction(async transaction => {
        const { dateStart, dateEnd, place, description } = sessionData
        console.log(1)
        if (moment(dateStart) > moment(dateEnd)) {
            throw new ConflictError('Дата начала сессии не может быть позже даты окончания!')
        }
        console.log(2)
        const session = await db.Session.create({
            dateStart: moment(dateStart).format('DD-MM-YYYY'), 
            dateEnd: moment(dateEnd).format('DD-MM-YYYY'), 
            place, 
            description
        }, { transaction })
        res.result = session
    })
}

exports.getSession = async (res, sessionId) => {
    const session = await db.Session.findByPk(sessionId)
    res.result = session
}

exports.addProject = async (res, projectData) => {
    await db.transaction(async transaction => {
		const { name, description } = projectData
        console.log(projectData)
        
        project = await db.Project.create({
            name,
            description
        }, { transaction })
            
        res.result = project
	})
}
