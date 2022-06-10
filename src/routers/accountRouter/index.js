import {Router} from 'express'

import accountController from '../../controllers/account/index.js'
import validateUserData from '../../midlewares/authMuddleware/index.js'
import validateLogin from '../../midlewares/authMuddleware/signinValidation.js'

const accountRouter = Router()
const account = new accountController()

accountRouter.post('/signup', validateUserData, account.signup)
accountRouter.post('/signin', validateLogin, account.signin)

export default accountRouter