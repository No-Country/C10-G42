import * as dotenv from 'dotenv'

dotenv.config()

const missing = ['PORT', 'DB_URL', 'URL_FRONTEND', 'SECRET'].filter(
  env => process.env[env] == null
)

if (missing.length > 0) {
  throw new Error(`Missing environment variables: ${missing.join(', ')}.`)
}

export const corsOptions = {
  origin: process.env.URL_FRONTEND,
  methods: ['GET', 'PUT', 'POST', 'DELETE'],
  optionsSuccessStatus: 200,
}

export const PORT = process.env.PORT ?? ('3001' as string)
export const DB_URL = process.env.DB_URL ?? ('' as string)
export const SECRET = process.env.SECRET ?? ('secreto' as string)
