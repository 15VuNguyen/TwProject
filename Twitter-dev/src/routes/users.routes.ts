import { Router } from 'express'
import { loginController, registerController } from '~/controllers/users.controllers'
import { loginValidator, registerValidator } from '~/middlewares/users.middlewares'
import { wrapAsync } from '~/utils/handler'

const usersRouter = Router()

/*
des: đăng nhập
path: /users/login
method: GET
body: {email, password}
*/
usersRouter.get('/login', loginValidator, wrapAsync(loginController))

/**
 * Description: Register a new user
 * Path: /register
 * Method: POST
 * body:{ 
        name: string,
        email: string,
        password: string,
        confirm_password: string,
        date_of_birth: string theo chuẩn ISO 8601
        }
 */
usersRouter.post('/register', registerValidator, wrapAsync(registerController))

export default usersRouter
