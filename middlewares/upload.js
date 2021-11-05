const util = require('util')
const multer = require('multer')

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
})

let uploadFile = multer({
    storage: storage
}).single('filedata')

let uploadFileMiddleware = util.promisify(uploadFile)
module.exports = uploadFileMiddleware
