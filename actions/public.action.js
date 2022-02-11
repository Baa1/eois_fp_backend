const db = require('../models')
const { ENTRY_STATUSES } = require('../utils/enums')
const { isEmpty } = require('../utils/helpers')
const { sendEmail } = require('../services/emailService')

exports.createEntry = async (res, entryData) => {
    await db.transaction(async transaction => {
        const entry = await db.Entry.create({
            ...entryData,
            status: ENTRY_STATUSES.New
        }, { transaction })
        let user = await db.User.findOne({
            where: {
                email: entryData.participantEmail
            }
        })
        if (isEmpty(user)) {
            const password = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5)
            user = await db.User.create({
                email: entryData.participantEmail,
                password: bcrypt.hashSync(password, 8)
            }, { transaction })
            sendEmail(entryData.participantEmail, 'Создание аккаунта', `На вашу почту был зарегистрирован аккаунт. Пароль: ${password}`)
        }
        sendEmail(entryData.participantEmail, 'Регистрация заявки', `Ваша заявка успешно зарегистрирована. Для проверки статуса заявки войдите в систему под своим аккаунтом.`)
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
