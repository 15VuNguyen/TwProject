import { Router } from 'express'
import { uploadSingleImageController } from '~/controllers/medias.controller'
import { wrapAsync } from '~/utils/handler'
const mediasRouter = Router()

mediasRouter.post('/upload-image', wrapAsync(uploadSingleImageController))

export default mediasRouter
