import * as dotenv from 'dotenv'
dotenv.config()

const missing = ['PORT', 'DB_URL', 'SECRET'].filter(
  (env) => process.env[env] == null
)

if (missing.length > 0) {
  throw new Error(`Missing environment variables: ${missing.join(', ')}.`)
}

export const PORT = process.env.PORT ?? '3001' as string
export const DB_URL = process.env.DB_URL ?? '' as string
export const SECRET = process.env.SECRET ?? 'secreto' as string
