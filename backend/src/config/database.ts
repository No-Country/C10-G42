import mongoose, { type ConnectOptions } from 'mongoose'
import { DB_URL } from './config'

const dbConnect = async (): Promise<void> => {
  mongoose.set('strictQuery', false)

  mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  } as ConnectOptions
  )
    .then(() => { console.log('Database connected') })
    .catch(err => { console.error('Database connection error: ', err) })
}

export default dbConnect
