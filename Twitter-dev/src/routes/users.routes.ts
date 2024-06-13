import { Router } from 'express'
import {
  emailVerifyTokenController,
  loginController,
  logoutController,
  registerController,
  resendEmailVerifyController
} from '~/controllers/users.controllers'
import {
  accessTokenValidator,
  emailVerifyTokenValidator,
  loginValidator,
  refreshTokenValidator,
  registerValidator
} from '~/middlewares/users.middlewares'
import { wrapAsync } from '~/utils/handler'

const usersRouter = Router()

/*
des: đăng nhập
path: /users/login
method: GET
body: {email, password}
*/
usersRouter.get('/login', loginValidator, wrapAsync(loginController))

/*
Description: Register a new user
Path: /register
Method: POST
body:{ 
       name: string,
       email: string,
       password: string,
       confirm_password: string,
       date_of_birth: string theo chuẩn ISO 8601
       }
 */
usersRouter.post('/register', registerValidator, wrapAsync(registerController))

/*
  des: lougout
  path: /users/logout
  method: POST
  Header: {Authorization: Bearer <access_token>}
  body: {refresh_token: string}
*/
usersRouter.post('/logout', accessTokenValidator, refreshTokenValidator, wrapAsync(logoutController))

/*
des: verify email token 
khi người dùng đăng ký họ sẽ nhận đc mail có link dạng
http://localhost:3000/verify-email?token=<email_verify_token>
nếu mà nhấp vào link thì sẽ tạo ra req gửi email_verify_token lên server
server kiểm tra email_verify_token có hợp lệ hay không
thì từ decode email_verify_token sẽ lấy ra user_id
và vào user_id đó để uptae email_verify_token thành '', và verify = 1, update at
path: /verify-email
method: POST
body: {email_verify_token: string}
*/
usersRouter.post('/verify-email', emailVerifyTokenValidator, wrapAsync(emailVerifyTokenController))

/*
des: resend email verify token
khi mail thất lạc, hoặc email_verify_token hết hạn. thì người dùng có
nhu cầu resend email_verify_token
path: /resend-verify-email
method: POST
Header:{Authorization: "Bearer <access_token>""} //đăng nhập mới cho resend email verify
body: {}
*/
usersRouter.post('/resend-verify-email', accessTokenValidator, wrapAsync(resendEmailVerifyController))

export default usersRouter
