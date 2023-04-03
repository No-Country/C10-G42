import express from 'express'
import cors from 'cors'
import './@types/index'
import mainRouter from './routes/index'
import { PORT } from './config/config'
import dbConnect from './config/database'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', mainRouter)

dbConnect().catch(error => {
  console.log(error)
})

app.listen(PORT, () => {
  console.log(
    `La API de gestión de turnos está escuchando en el puerto ${PORT}`
  )
})
