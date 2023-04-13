import * as dotenv from 'dotenv'

dotenv.config()

const missing = ['PORT', 'DB_URL', 'URL_FRONTEND', 'SECRET'].filter(
  env => process.env[env] == null
)

if (missing.length > 0) {
  throw new Error(`Missing environment variables: ${missing.join(', ')}.`)
}

const whiteList = [process.env.URL_FRONTEND]
export const corsOptions = {
  origin: function (origin: any, callback: any) {
    if (whiteList.includes(origin)) {
      // dominio habilitado para API
      callback(null, true)
    } else {
      callback(new Error('Error de cors'))
    }
  }
}

export const PORT = process.env.PORT ?? ('3001' as string)
export const DB_URL = process.env.DB_URL ?? ('' as string)
export const SECRET = process.env.SECRET ?? ('secreto' as string)
