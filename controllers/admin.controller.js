const db = require('../models')
const { session: Session, user: User } = db

exports.getSession = (req, res) => {
    try {
        Session.findByPk(req.params.sessionId, { attributes: ['id', 'dateStart', 'dateEnd', 'place'] })
        .then(session => {
            return res.status(200).json(session)
        })        
    } catch (err) {
        return res.status(500).send({ message: err.message })
    }
}

exports.getAllSessions = async (req, res) => {
    try {
        let sessions = await Session.findAll()
        return res.status(200).json(sessions)    
    } catch (err) {
        return res.status(500).send({ message: err.message })
    }
}

exports.addSession = (req, res) => {
    try {
        Session.create({
            dateStart: req.body.dateStart,
            dateEnd: req.body.dateEnd,
            place: req.body.place
        })
        .then(session => {
            if (session.id > 0)
                return res.send({ message: 'Session was created successfully!' })
        })        
    } catch (err) {
        return res.status(500).send({ message: err.message })
    }
}

exports.updateSession = async (req, res) => {
    try {
        console.log(req.body)
        let session = await Session.findByPk(req.body.id)
        await session.update(req.body)
        return res.send({ session })
    } catch (err) {
        return res.status(500).send({ message: err.message })
    }
}
