const express = require('express')
const router = express.Router()
const fileController = require('../controllers/file.controller')

router.post(
    '/upload', 
    fileController.upload
)

router.get(
    '/files', 
    fileController.getListFiles
)

router.get(
    '/:name', 
    fileController.download
)

module.exports = router
