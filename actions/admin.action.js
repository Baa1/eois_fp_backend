const db = require('../models')
const moment = require('moment')
const { ConflictError, NotFoundError } = require('../utils/errors')
const { isEmpty } = require('../utils/helpers')
const { ENTRY_STATUSES } = require('../utils/enums')
const { sendEmail } = require('../services/emailService')

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

exports.addFirm = async (res, firmData) => {
    await db.transaction(async transaction => {
        const { name, slogan, logo} = firmData
        const firm = await db.Project.create({
            name,
            slogan, 
            logo
        }, { transaction })
            
        res.result = firm
    })
}

exports.addProjectSession = async (res, ProjectSessionData) => {
    await db.transaction(async transaction => {
        const { sessionId, arrProjectId=[] } = ProjectSessionData
        arrProjectId.forEach(async element => {
            const projectSession = await db.ProjectSession.create({
                sessionId,
                element
            }, { transaction })

            res.result = projectSession
        });
    })
}

exports.updateEntryStatus = async (res, status, entryId) => {
    await db.transaction(async transaction => {
        let entry = await db.Entry.findByPk(entryId)
        if (isEmpty(entry)) {
            throw new NotFoundError('Заявка не найдена')
        }
        if (status === ENTRY_STATUSES.Accepted) {

        } else if (status === ENTRY_STATUSES.Rejected) {
            sendEmail(entry.parentEmail, 'Отклонение заявки', 'Ваша заявка была отклонена администратором') 
        } else {
            throw new ConflictError('Неверный статус заявки')
        }
        await entry.update({
            status
        }, { transaction })
        res.result = entry
    })
}

exports.getEntries = async (res) => {
    const entries = await db.Entry.findAll()
    res.result = entries
}

exports.getDirections = async (res) => {
    const directions = await db.Direction.findAll()
    res.result = directions
}
