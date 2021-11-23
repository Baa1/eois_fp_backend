const express = require('express')
const router = express.Router()
const { publicController } = require('../controllers')

router.post(
    'entry',
    publicController.createEntry
)

module.exports = router
