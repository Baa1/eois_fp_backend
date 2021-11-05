const express = require('express')
const router = express.Router()
const { authJwt } = require('../middlewares')
const { adminController } = require('../controllers')

router.get(
    '/sessions',
    [authJwt.verifyToken],
    adminController.getAllSessions
)

router.post(
    '/session',
    [authJwt.verifyToken],
    adminController.addSession
)

router.put(
    '/session/:id',
    [authJwt.verifyToken],
    adminController.updateSession
)

router.get(
    'session/:id',
    [authJwt.verifyToken],
    adminController.getSession
)

module.exports = router
