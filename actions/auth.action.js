const db = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { ROLES } = require('../utils/enums')
const { ForbiddenError, UnauthorizedError, CustomError } = require('../utils/errors')
const { isEmpty } = require('lodash')

exports.signUp = async (res, userData) => {
	await db.transaction(async transaction => {
		const { email, password } = userData
    let user = await db.User.findOne({
      email
    })
    if (!isEmpty(user)) {
      throw new CustomError('Пользователь с такой почтой уже зарегистрирован')
    }
		user = await db.User.create({
			email,
			password: bcrypt.hashSync(password, 8)
		}, { transaction })
		const guestRole = await db.Role.findOne({
			where: {
				name: ROLES.Guest
			}
		})
		await db.UserRole.create({
			userId: user.id,
			roleId: guestRole.id
		}, { transaction })
		res.result = user
	})
}

exports.signIn = async (res, userData) => {
    try {
      const { email, password } = userData
      let user = await db.User.findOne({ where: { email } })
      if (!user) {
        throw new UnauthorizedError('Пользователь с таким логином/паролем не найден')
      }
      const passwordIsValid = bcrypt.compareSync(
        password,
        user.password
      )
      if (!passwordIsValid) {
        throw new UnauthorizedError('Неверный пароль')
      }
      // const token = jwt.sign({ id: user.id }, config.secret, {
      //   expiresIn: config.jwtExpiration
      // })
      let refreshToken = await db.RefreshToken.createToken(user)
      const authorities = []
      const roles = await user.getRoles()
      for (let i = 0; i < roles.length; i++) {
        authorities.push('ROLE_' + roles[i].name.toUpperCase())
      }
      res.result = {
        id: user.id,
        email: user.username,
        roles: authorities,
        accessToken: token,
        refreshToken: refreshToken
      }
    } catch (error) {
      throw new CustomError()
    }
}

exports.refreshToken = async (res, requestToken) => {
  if (requestToken == null) {
    throw new ForbiddenError()
  }

  try {
    let refreshToken = await RefreshToken.findOne({ where: { token: requestToken } })

  	if (!refreshToken) {
      throw new ForbiddenError()
  	}

  	if (RefreshToken.verifyExpiration(refreshToken)) {
  		RefreshToken.destroy({ where: { id: refreshToken.id } })

      throw new ForbiddenError()
  	}

  	const user = await refreshToken.getUser()
  	// let newAccessToken = jwt.sign({ id: user.id }, config.secret, {
  	// 	expiresIn: config.jwtExpiration,
  	// })

    res.status = 200
    res.result = {
      accessToken: newAccessToken,
	    refreshToken: refreshToken.token
    }
  	return res
  } catch (error) {
    res.status = 500
    res.result = { message: error.message }
    return res
  }
}
