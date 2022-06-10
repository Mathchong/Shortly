import {Router} from 'express'

import usersController from '../../controllers/users/index.js'
import validateParamsId from '../../midlewares/urlsMiddleware/paramsIdValidation.js'
import validateToken from '../../midlewares/authMuddleware/tokenValidation.js'

const usersRouter = Router()
const users = new usersController()

usersRouter.get('/users/:id' , validateParamsId, validateToken, users.getUserById)
usersRouter.get('/ranking', users.getRanking)

export default usersRouter