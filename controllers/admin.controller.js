const { adminAction } = require('../actions')
const Result = require('../utils/result')

exports.addProject = async (req, res, next) => {
	try {
		let result = new Result()
		await adminAction.addProject(result, req.body)
		return res.status(result.status).send(result)
	} catch (error) {
		next(error)
	}
}
