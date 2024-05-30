import { Request, Response } from 'express'
import User from '~/models/schemas/User.schema'
import databaseService from '~/services/database.services'
import usersService from '~/services/users.services'
import { ParamsDictionary } from 'express-serve-static-core'
import { RegisterReqBody } from '~/models/requests/Users.requests'

export const loginController = (req: Request, res: Response) => {
  const { email, password } = req.body
  if (email === 'test@gmail.com' && password === '123456') {
    return res.json({
      message: 'Login success',
      result: [
        { fname: 'Điệp', yob: 1999 },
        { fname: 'Hùng', yob: 2003 },
        { fname: 'Được', yob: 1994 }
      ]
    })
  }
  res.status(400).json({
    error: 'Login failed'
  })
}

export const registerController = async (req: Request<ParamsDictionary, any, RegisterReqBody>, res: Response) => {
  try {
    const result = await usersService.register(req.body)
    res.json({
      message: 'Register success',
      result
    })
  } catch (error) {
    res.status(400).json({
      message: 'Register failed',
      error
    })
  }
}
