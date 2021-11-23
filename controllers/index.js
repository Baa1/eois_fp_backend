const adminController = require('./admin.controller')
const authController = require('./auth.controller')
const fileController = require('./file.controller')
const publicController = require('./public.controller')

module.exports = {
    authController,
    fileController,
    adminController,
    publicController
}
