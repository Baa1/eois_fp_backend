const authJwt = require('./authJwt')
const uploadFile = require('./upload')
const validate = require('./validate')
const errors = require('./errors')

module.exports = {
	authJwt,
	uploadFile,
	validate,
	errors
}
