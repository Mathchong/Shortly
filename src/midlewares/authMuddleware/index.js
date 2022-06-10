import Joi from "joi"

import signupSchema from '../../schemas/authSchemas/signupSchema.js'

export default function validateUserData(req, res, next){
    const { body } = req

    const validation = signupSchema.validate(body, { abortEarly: false })
    if (validation.error) return res.status(422).json({message: 'Invalid Body Structure', status: 422, error: validation.error.detalis})

    next();
}