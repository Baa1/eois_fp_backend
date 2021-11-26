const db = require('../models')
const moment = require('moment')
const { ConflictError, NotFoundError } = require('../utils/errors')
const { isEmpty } = require('../utils/helpers')

exports.addSession = async (res, sessionData) => {
    await db.transaction(async transaction => {
        const { dateStart, dateEnd, place, description } = sessionData
        if (moment(dateStart) > moment(dateEnd)) {
            throw new ConflictError('Дата начала сессии не может быть позже даты окончания!')
        }
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
		const { name, description, status } = projectData
        
        const project = await db.Project.create({
            name,
            description,
            status
        }, { transaction })
            
        res.result = project
	})
}

exports.getProject = async (res, projectId) => {
    const project = await db.Project.findByPk(projectId)
    res.result = project
}

exports.updateSession = async (res, sessionData, sessionId) => {
    await db.transaction(async transaction => {
        let session = await db.Session.findByPk(sessionId)
        if (isEmpty(session)) {
            throw new NotFoundError('Сессия не найдена')
        }
        const { dateStart, dateEnd, place, description } = sessionData
        if (moment(dateStart) > moment(dateEnd)) {
            throw new ConflictError('Дата начала сессии не может быть позже даты окончания!')
        }
        session = await db.Session.update({
            dateStart: moment(dateStart).format('DD-MM-YYYY'), 
            dateEnd: moment(dateEnd).format('DD-MM-YYYY'), 
            place, 
            description
        }, { where: { id: sessionId } },  { transaction })
        res.result = session
    })
}

exports.updateEntryStatus = async (res, status, entryId) => {
    await db.transaction(async transaction => {
        let entry = await db.Entry.findByPk(entryId)
        if (isEmpty(entry)) {
            throw new NotFoundError('Заявка не найдена')
        }
        await entry.update({
            status
        }, { transaction })
        res.result = entry
    })
}
