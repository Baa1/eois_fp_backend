const db = require('../models')
// const config = require('../config/auth.config')
const { user: User, role: Role, refreshToken: RefreshToken } = db

const Op = db.Sequelize.Op

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const { authService, userService } = require('../services')
const { validationResult } = require('express-validator')

exports.signUp = async (req, res) => {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() })
	}
	try {
		let user = await authService.signUp(req.body)
		if (user.id > 0) return res.send({ message: 'User was registered successfully!' })
	} catch (error) {
		return res.status(500).send({ message: error.message })
	}
}

exports.signIn = async (req, res) => {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() })
	}
	try {
		let { login, password } = req.body
		let user = await authService.signIn(login, password)
		if (user.message === 'User not found') return res.status(404).send(user)
		if (user.message === 'Invalid password!') return res.status(401).send(user)
		return res.send(user)
	} catch (error) {
		return res.status(500).send({ message: error.message })
	}
}

exports.refreshToken = async (req, res) => {
	const { refreshToken: requestToken } = req.body
  
	if (requestToken == null) {
		return res.status(403).json({ message: 'Refresh Token is required!' })
	}
  
	try {
		let refreshToken = await RefreshToken.findOne({ where: { token: requestToken } })

		console.log(refreshToken)

		if (!refreshToken) {
			res.status(403).json({ message: 'Refresh token is not in database!' })
			return;
		}

		if (RefreshToken.verifyExpiration(refreshToken)) {
			RefreshToken.destroy({ where: { id: refreshToken.id } })
		
			res.status(403).json({
				message: 'Refresh token was expired. Please make a new signin request',
			})
			return
		}
  
		const user = await refreshToken.getUser()
		// let newAccessToken = jwt.sign({ id: user.id }, config.secret, {
		// 	expiresIn: config.jwtExpiration,
		// });
  
		return res.status(200).json({
			accessToken: newAccessToken,
			refreshToken: refreshToken.token,
		})
	} catch (err) {
		return res.status(500).send({ message: err.message })
	}
};
