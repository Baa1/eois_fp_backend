const express = require('express')
const router = express.Router()
const { publicController } = require('../controllers')

router.post(
    'entry',
    publicController.createEntry
)

router.get(
    '/entry/:id',
    publicController.getEntry
)

module.exports = router
