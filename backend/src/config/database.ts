import mongoose, { ConnectOptions } from "mongoose";
import { DB_URL } from "./config";

const db = {
  connect: async () => {
    mongoose.set('strictQuery', false);
    mongoose.connect(DB_URL, 
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        //useFindAndModify: false,
        //useCreateIndex: true,
      } as ConnectOptions
    )
    .then(() => console.log('Database connected'))
    .catch(err => console.error('Database connection error: ', err));
  }
}

export default db;