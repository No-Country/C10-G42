import cors from 'cors'
import express from 'express'

import './@types/index'
import { PORT } from './config/config'
import dbConnect from './config/database'
import mainRouter from './routes/index'

const app = express()

// const whiteList = ['http://127.0.0.1:5173/'];
// const corsOptions = {
//   origin: function (origin: any, callback: any) {
//     if (whiteList.includes(origin)) {
//       //dominio habilitado para API
//       callback(null, true);
//     } else {
//       callback(new Error('Error de cors', origin));
//     }
//   }
// }

const allowedOrigins = ['http://127.0.0.1:5173'];

const corsOptions: cors.CorsOptions = {
  origin: allowedOrigins,
};

app.use(cors(corsOptions));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', mainRouter)

dbConnect().catch(error => {
  console.log(error)
})

app.listen(PORT, () => {
  console.log(
    `La API de gestión de turnos está escuchando en el puerto ${PORT}`
  )
})
