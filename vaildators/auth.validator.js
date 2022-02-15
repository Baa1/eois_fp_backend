const { validate } = require('../middlewares')
const { body } = require('express-validator')

exports.signIn = [[
    body('email').not().isEmpty().trim().withMessage('Email cannot be empty').isEmail().withMessage('Wrong email format'),
    body('password').not().isEmpty().trim().withMessage('Password cannot be empty.').isLength({min: 5}).withMessage("Your password must be at least 6 digits")
], validate]

exports.signUp = [[
    body('email').not().isEmpty().trim().withMessage('Email cannot be empty').isEmail().withMessage('Wrong email format'),
    body('password').not().isEmpty().trim().withMessage('Password cannot be empty.').isLength({min: 5}).withMessage("Your password must be at least 6 digits")
], validate]
