import { Router } from 'express'
import { serveImageController } from '~/controllers/medias.controller'

const staticRouter = Router()

staticRouter.get('/image/:namefile', serveImageController)

//vậy route sẽ là localhost:4000/static/image/:namefile
export default staticRouter
