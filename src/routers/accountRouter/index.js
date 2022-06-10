import {Router} from 'express'

import accountController from '../../controllers/account/index.js'

const accountRouter = Router()
const account = new accountController()

accountRouter.post('/signup', account.signup)
accountRouter.post('/signin', account.signin)

export default accountRouter