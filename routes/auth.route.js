const express = require('express')
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

router.post('/refreshtoken', authController.refreshToken)

module.exports = router 
