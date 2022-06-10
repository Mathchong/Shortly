import {Router} from 'express'

import urlsController from '../../controllers/urls/index.js'
import validateToken from '../../midlewares/authMuddleware/tokenValidation.js'
import validateParamsId from '../../midlewares/urlsMiddleware/paramsIdValidation.js'

const urlsRouter = Router()
const urls = new urlsController()

urlsRouter.post('/shorten', validateToken, urls.shortenUrl)
urlsRouter.get('/:id',validateParamsId, urls.getUrlById)
urlsRouter.get('/open/:shortUrl', urls.redirectToUrl)
urlsRouter.delete('/:id',validateParamsId,  validateToken, urls.deleteUrlById)

export default urlsRouter