const db = require('../models')
const jwt = require('jsonwebtoken')
const { ROLES } = require('../utils/enums')

exports.addSession = () => {

}

exports.getSessions = () => {

}

exports.getSession = () => {
    
}

exports.addProject = (res, projectData) => {
await db.transaction(async transaction => {
		const { name, description } = projectData
    console.log(userData)
    
	project = await db.Project.create({
		name,
		description
	}, { transaction })
		
	res.result = {
		nmae: project.name,
		description: project.description
    }
	})
}
