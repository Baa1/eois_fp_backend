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

exports.getProject = async (req, res, next) => {
	try {
		let result = new Result()
		await adminAction.getProject(result, req.params.id)
		return res.status(result.status).send(result)
	} catch (error) {
		next(error)
	}
}

exports.updateSession = async (req, res, next) => {
	try {
		let result = new Result()
		await adminAction.updateSession(result, req.body, req.params.id)
		return res.status(result.status).send(result)
	} catch (error) {
		next(error)
	}
}

exports.addFirm = async (req, res, next) => {
	try {
		let result = new Result()
		await adminAction.addFirm(result, req.body)
    return res.status(result.status).send(result)
	} catch (error) {
		next(error)
	}
}

exports.updateEntryStatus = async (req, res, next) => {
	try {
		let result = new Result()
		await adminAction.updateEntryStatus(result, req.body.status, req.params.id)
		return res.status(result.status).send(result)
	} catch (error) {
		next(error)
	}
}

exports.addProjectSession = async (req, res, next) => {
	try {
		let result = new Result()
		await adminAction.addProjectSession(result, req.body)
		return res.status(result.status).send(result)
	} catch (error) {
		next(error)
	}
}

exports.getEntries = async (req, res, next) => {
    try {
		let result = new Result()
		await adminAction.getEntries(result)
    	return res.status(result.status).send(result)
	} catch (error) {
		next(error)
	}
}

exports.getDirections = async (req, res, next) => {
    try {
		let result = new Result()
		await adminAction.getDirections(result)
    return res.status(result.status).send(result)
	} catch (error) {
		next(error)
	}
}

exports.getProjects = async (req, res, next) => {
    try {
		let result = new Result()
		await adminAction.getProjects(result)
    return res.status(result.status).send(result)
	} catch (error) {
		next(error)
	}
}
