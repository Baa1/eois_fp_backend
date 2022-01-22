const db = require('../models')
const { ENTRY_STATUSES } = require('../utils/enums')

exports.createEntry = async (res, entryData) => {
    await db.transaction(async transaction => {
        const entry = await db.Entry.create({
            ...entryData,
            status: ENTRY_STATUSES.New
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
