import * as dotenv from 'dotenv'

dotenv.config()

const missing = ['PORT', 'DB_URL', 'SECRET', 'URL_FRONTEND', 'URL_FRONT_DEPLOYMENT'].filter(
  env => process.env[env] == null
)

if (missing.length > 0) {
  throw new Error(`Missing environment variables: ${missing.join(', ')}.`)
}

// CORS config
const allowOrigins: string[] = [
  'http://127.0.0.1:5173/',
  'https://consultoriomern.vercel.app',
  'https://consultoriomern-git-dev-mernconsultorio.vercel.app'
]


export const corsOptions = {
  origin: function (origin: any, callback: any) {
    if (allowOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'PUT', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 204
}

// NODEMAILER config
export const transportOptions = {
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
}

// ENV config
export const PORT = process.env.PORT ?? ('3001' as string)
export const DB_URL = process.env.DB_URL ?? ('' as string)
export const SECRET = process.env.SECRET ?? ('secreto' as string)
export const URL_FRONTEND = process.env.URL_FRONTEND ?? ('' as string)
