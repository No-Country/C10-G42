import mongoose, { type ConnectOptions } from 'mongoose'
import { DB_URL } from './config'

interface Opt extends ConnectOptions {
  useNewUrlParser: boolean
  useUnifiedTopology: boolean
}

const dbConnect = async (): Promise<void> => {
  mongoose.set('strictQuery', false)

  const options: Opt = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }

  mongoose.connect(DB_URL, options)
    .then(() => { console.log('Database connected') })
    .catch(err => { console.error('Database connection error: ', err) })
}

export default dbConnect
