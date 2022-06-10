import Joi from "joi"

import signinSchema from '../../schemas/authSchemas/signinSchema.js'

export default function validateLogin(req, res, next){
    const { body } = req

    const validation = signinSchema.validate(body, { abortEarly: false })
    if (validation.error) return res.status(422).json({message: 'Invalid Body Structure', status: 422, error: validation.error.detalis})

    next();
}