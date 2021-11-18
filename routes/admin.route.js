const express = require('express')
const router = express.Router()
const { authJwt } = require('../middlewares')
const { adminController } = require('../controllers')

router.post(
    '/session',
    adminController.addSession
)

router.get(
    '/session/:id',
    adminController.getSession
)

router.post(
    '/project',
    adminController.addProject
)

router.get(
    '/project/:id',
    adminController.getProject
)

module.exports = router
