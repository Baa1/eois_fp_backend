const { adminAction } = require('../actions')
const Result = require('../utils/result')

exports.addSession = async (req, res, next) => {
    try {
		let result = new Result()
		await adminAction.addSession(result, req.body)
		return res.status(result.status).send(result)
	} catch (error) {
		next(error)
	}
}

exports.getSession = async (req, res, next) => {
    try {
		let result = new Result()
		await adminAction.getSession(result, req.params.id)
    return res.status(result.status).send(result)
	} catch (error) {
		next(error)
	}
}
      
exports.addProject = async (req, res, next) => {
	try {
		let result = new Result()
		await adminAction.addProject(result, req.body)
		return res.status(result.status).send(result)
	} catch (error) {
		next(error)
	}
}
