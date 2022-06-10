import {Router} from 'express'

import urlsController from '../../controllers/urls/index.js'

const urlsRouter = Router()
const urls = new urlsController()

urlsRouter.post('/shorten', urls.shortenUrl)
urlsRouter.get('/:id', urls.getUrlById)
urlsRouter.get('/open/:shortUrl', urls.getUrlById)
urlsRouter.delete('/:id', urls.deleteUrlById)

export default urlsRouter