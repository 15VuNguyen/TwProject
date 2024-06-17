import { Request } from 'express'
import sharp from 'sharp'
import { UPLOAD_IMAGE_DIR } from '~/constants/dir'
import { getNameFromFullname, handleUploadImage, handleUploadVideo } from '~/utils/file'
import fs from 'fs'
import { isProduction } from '~/constants/config'
import { MediaType } from '~/constants/enums'
import { Media } from '~/models/Other'

class MediasService {
  async uploadImage(req: Request) {
    //lưu ảnh vào trong uploads/temp
    const files = await handleUploadImage(req) //đem từ uploadSingleImageController qua
    //xử lý file bằng sharp tối ưu hình ảnh
    const resutlt: Media[] = await Promise.all(
      files.map(async (file) => {
        const newFilename = getNameFromFullname(file.newFilename) + '.jpg'
        const newPath = UPLOAD_IMAGE_DIR + '/' + newFilename //đường dẫn mới của file sau khi xử lý
        const info = await sharp(file.filepath).jpeg().toFile(newPath)
        //xóa file trong temp
        fs.unlinkSync(file.filepath)

        return {
          url: isProduction
            ? `${process.env.HOST}/static/image/${newFilename}`
            : `http://localhost:${process.env.PORT}/static/image/${newFilename}`,
          type: MediaType.Image
        }
      })
    )
    return resutlt
  }

  async uploadVideo(req: Request) {
    //lưu video vào trong uploads/videos
    const files = await handleUploadVideo(req)
    //xử lý file bằng sharp tối ưu hình ảnh
    const resutlt: Media[] = await Promise.all(
      files.map(async (file) => {
        const { newFilename } = file

        return {
          url: isProduction
            ? `${process.env.HOST}/static/video/${newFilename}`
            : `http://localhost:${process.env.PORT}/static/video/${newFilename}`,
          type: MediaType.Video
        }
      })
    )
    return resutlt
  }
}

const mediasService = new MediasService()

export default mediasService
