import cors from 'cors'
import express from 'express'
import morgan from 'morgan'

import './@types/index'
import { PORT, corsOptions } from './config/config'
import dbConnect from './config/database'
import mainRouter from './routes/index'

const app = express()
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('tiny'))

app.use('/api', mainRouter)

dbConnect().catch(error => {
  console.log(error)
})

app.listen(PORT, () => {
  console.log(
    `La API de gestión de turnos está escuchando en el puerto ${PORT}`
  )
})
