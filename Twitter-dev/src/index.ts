import express from 'express'
import usersRouter from './routes/users.routes'
import databaseService from './services/database.services'

const app = express()
app.use(express.json())
const PORT = 3000
databaseService.connect()

//localhost:3000/
app.get('/', (req, res) => {
  res.send('olala!!')
})

//localhost:3000/api/tweets
app.use('/users', usersRouter)

app.listen(PORT, () => {
  console.log(`Server dang chay tren port ${PORT}`)
})
