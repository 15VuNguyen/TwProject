import { RequestHandler, NextFunction, Request, Response } from 'express'

export const wrapAsync = <P>(func: RequestHandler<P>) => {
  return async (req: Request<P>, res: Response, next: NextFunction) => {
    //tạo ra cấu trúc try catch
    try {
      await func(req, res, next)
    } catch (error) {
      next(error)
    }
  }
}
