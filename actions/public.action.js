const db = require('../models')
const moment = require('moment')
const { ConflictError, NotFoundError } = require('../utils/errors')
const { isEmpty } = require('../utils/helpers')

exports.createEntry = async (res, entryData) => {
    await db.transaction(async transaction => {
        const entry = await db.Entry.create({
            ...entryData
        }, { transaction })
        res.result = entry
    })
}

exports.getEntry = async (res, entryData) => {
    const entry = await db.Entry.findByPk(entryData)
    res.result = entry
}

exports.getSessions = async (res) => {
    const sessions = await db.Session.findAll()
    res.result = sessions
}
