const authRouter = require('./auth.route')
const adminRouter = require('./admin.route')
const fileRouter = require('./file.route')
const publicRouter = require('./public.route')

module.exports = app => {
    app.use('/api/v1/auth', authRouter),
    app.use('/api/v1/admin', adminRouter),
    app.use('/api/v1/file', fileRouter),
    app.use('/api/v1/public', publicRouter)
}
