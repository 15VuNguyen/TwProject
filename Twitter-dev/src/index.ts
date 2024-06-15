import express, { NextFunction, Request, Response } from 'express'
import usersRouter from './routes/users.routes'
import databaseService from './services/database.services'
import { defaultErrorHandler } from './middlewares/error.middlewares'
import mediasRouter from './routes/medias.routes'
import { initFolder } from './utils/file'
import { config } from 'dotenv'

config()

const app = express()
const PORT = process.env.PORT || 4000
initFolder()
app.use(express.json())
databaseService.connect()

//localhost:3000/
app.get('/', (req, res) => {
  res.send('olala!!')
})

//localhost:3000/users/register
app.use('/users', usersRouter)
app.use('/medias', mediasRouter)

app.use(defaultErrorHandler)

app.listen(PORT, () => {
  console.log(`Server dang chay tren port ${PORT}`)
})
