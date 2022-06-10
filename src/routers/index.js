import {Router} from "express"

import accountRouter from './accountRouter/index.js'
import urlsRouter from './urlsRouter/index.js'
import usersRouter from './usersRouter/index.js'

const router = Router()

router.use('/',accountRouter)
router.use('/urls',urlsRouter)
router.use('/',usersRouter)

export default router
