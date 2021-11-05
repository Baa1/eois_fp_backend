const { authAction } = require('../actions')
const Result = require('../utils/result')

exports.signUp = async (req, res, next) => {
	try {
		let result = new Result()
		await authAction.signUp(result, req.body)
		return res.status(result.status).send(result)
	} catch (error) {
		next(error)
	}
}

exports.signIn = async (req, res, next) => {
	try {
		let result = new Result()
		await authAction.signIn(result, req.body)
		return res.status(result.status).send(result)
	} catch (error) {
		next(error)
	}
}

exports.refreshToken = async (req, res, next) => {
	try {
		let result = new Result()
		await authAction.refreshToken(result, req.body)
		return res.status(result.status).send(result)
	} catch (error) {
		next(error)
	}
}
