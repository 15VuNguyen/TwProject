import { Request } from 'express'
import sharp from 'sharp'
import { UPLOAD_DIR } from '~/constants/dir'
import { getNameFromFullname, handleUploadSingleImage } from '~/utils/file'
import fs from 'fs'
import { isProduction } from '~/constants/config'

class MediasService {
  async handleUploadSingleImage(req: Request) {
    //lưu ảnh vào trong uploads/temp
    const file = await handleUploadSingleImage(req) //đem từ uploadSingleImageController qua
    //xử lý file bằng sharp tối ưu hình ảnh
    const newFilename = getNameFromFullname(file.newFilename) + '.jpg'
    const newPath = UPLOAD_DIR + '/' + newFilename //đường dẫn mới của file sau khi xử lý
    const info = await sharp(file.filepath).jpeg().toFile(newPath)
    //xóa file trong temp
    fs.unlinkSync(file.filepath)
    return isProduction
      ? `${process.env.HOST}/medias/${newFilename}`
      : `http://localhost:${process.env.PORT}/medias/${newFilename}`
  }
}

const mediasService = new MediasService()

export default mediasService
