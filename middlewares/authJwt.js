const jwt = require('jsonwebtoken')
const db = require('../models')

const { TokenExpiredError } = jwt

const catchError = (err, res) => {
    if (err instanceof TokenExpiredError) {
        return res.status(401).send({ message: 'Unauthorized! Access Token was expired!' })
    }

    return res.sendStatus(401).send({ message: 'Unauthorized!' })
}

verifyToken = (req, res, next) => {
    let token = req.headers['Authorization'].split(' ')[1]

    if (!token) {
        return res.status(403).send({ message: 'No token provided!' })
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return catchError(err, res)
        }
        req.userId = decoded.id
        next()
    })
}

const authJwt = {
    verifyToken
}

module.exports = authJwt
