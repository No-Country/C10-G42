import jwt from 'jsonwebtoken'
import { SECRET } from '../config/config'

// Firmar el token
// Recibe el objeto de usuario como @param
const tokenSign = (userId: string, username: string): string => {
  const sign = jwt.sign(
    {
      _id: userId,
      username
    },
    SECRET,
    {
      expiresIn: '2h'
    }
  )

  return sign
}

// Verificar si el token fue firmado por el backend
// Recibe el token de session de JWT como @param
const verifyToken = async (tokenJwt: string): Promise<any> => {
  try {
    return jwt.verify(tokenJwt, SECRET)
  } catch (e) {
    return null
  }
}

export {
  tokenSign,
  verifyToken
}
