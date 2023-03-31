import mongoose, { type ConnectOptions } from 'mongoose'
import { DB_URL } from './config'

const dbConnect = async (): Promise<any> => {
  mongoose.set('strictQuery', false)

  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  } as ConnectOptions

  mongoose.connect(DB_URL, options)
    .then(() => { console.log('Database connected') })
    .catch(err => { console.error('Database connection error: ', err) })
}

export default dbConnect
