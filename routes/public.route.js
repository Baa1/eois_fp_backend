const express = require('express')
const router = express.Router()
const { publicController } = require('../controllers')

router.post(
    '/entry',
    publicController.createEntry
)

router.get(
    '/entry/:id',
    publicController.getEntry
)

router.get(
    '/sessions',
    publicController.getSessions
)

module.exports = router
