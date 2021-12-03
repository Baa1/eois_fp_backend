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

router.put(
    '/project/:id',
    adminController.updateProject
)

router.put(
    '/session/:id',
    adminController.updateSession
)

router.put(
    '/firm/:id',
    adminController.updateFirm
)

router.post(
    '/firm',
    adminController.addFirm
)

router.post(
    '/projectsession',
    adminController.addProjectSession
)

router.put(
    '/entry/:id',
    adminController.updateEntryStatus
)

router.get(
    '/entries',
    adminController.getEntries
)

router.get(
    '/directions',
    adminController.getDirections
)

module.exports = router
