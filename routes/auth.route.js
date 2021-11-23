const express = require('express')
const router = express.Router()
const { authController } = require('../controllers')
const { authValidator } = require('../vaildators')
const { sendEmail } = require('../services/emailService')

router.post(
    '/signup',
    authValidator.signUp,
    authController.signUp
)

router.post(
    '/signin', 
    authValidator.signIn,
    authController.signIn
)

router.get(
    '/test',
    (req, res) => {
        sendEmail('baa1_666@mail.ru', 'hi', req.query.text)
        res.send(req.query)
    }
)

router.post('/refreshtoken', authController.refreshToken)

module.exports = router 
