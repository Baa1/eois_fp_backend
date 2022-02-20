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
    '/session/:id',
    adminController.updateSession
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

router.get(
    '/projects',
    adminController.getProjects
)

module.exports = router
