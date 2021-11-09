const express = require('express')
const passport = require('passport')
const router = express.Router()
const { authController } = require('../controllers')
const { authValidator } = require('../vaildators')

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
        res.send(req.query)
    }
)

router.post('/refreshtoken', authController.refreshToken)

router.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }))

module.exports = router 
