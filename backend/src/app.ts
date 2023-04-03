import cors from 'cors'
import express from 'express'

import { PORT } from './config/config'
import dbConnect from './config/database'
import mainRouter from './routes/index'

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
