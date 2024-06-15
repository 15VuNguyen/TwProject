import { NextFunction, Request, Response } from 'express'
import formidable from 'formidable'
import path from 'path'
import { UPLOAD_DIR } from '~/constants/dir'
import { USERS_MESSAGES } from '~/constants/messages'
import mediasService from '~/services/medias.services'

export const uploadImageController = async (req: Request, res: Response) => {
  const url = await mediasService.uploadImage(req)
  return res.json({
    message: USERS_MESSAGES.UPLOAD_SUCCESS,
    result: url
  })
}

//khỏi async vì có đợi gì đâu
export const serveImageController = (req: Request, res: Response) => {
  const { namefile } = req.params //lấy namefile từ param string
  res.sendFile(path.resolve(UPLOAD_DIR, namefile), (error) => {
    if (error) {
      return res.status((error as any).status).send('File not found')
    }
  }) //trả về file
}
