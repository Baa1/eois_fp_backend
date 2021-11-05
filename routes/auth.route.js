const express = require('express')
const router = express.Router()
const controller = require('../controllers/auth.controller')
const { authValidator } = require('../vaildators')

router.post(
    '/signup',
    authValidator.signUp,
    controller.signUp
)

router.post(
    '/signin', 
    authValidator.signIn,
    controller.signIn
)

router.post('/refreshtoken', controller.refreshToken)

module.exports = router 
