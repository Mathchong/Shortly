import {Router} from 'express'

import usersController from '../../controllers/users/index.js'

const usersRouter = Router()
const users = new usersController()

usersRouter.get('/users/:id' , users.getUserById)
usersRouter.get('/ranking', users.getRanking)

export default usersRouter