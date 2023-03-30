import { type NextFunction, type Request, type Response } from 'express'
import { type Patient } from '../interfaces/Patient'
import { httpErrorHandler } from '../utils/httpErrorHandler'

declare global {
  namespace Express {
    export interface Request {
      user?: Patient // TODO: Agregar modelo de Doctor -> user?: Patient | Doctor
    }
  }
}

const checkRol = (roles: string[]) => (req: Request, res: Response, next: NextFunction): void => {
  try {
    const userRole = req.user?.role
    if (userRole == null) {
      httpErrorHandler(res, { message: 'ERROR_ROLE' }, 403); return
    }

    const checkRoleValue = roles.some((allowedRole) => userRole.includes(allowedRole))
    if (!checkRoleValue) {
      httpErrorHandler(res, { message: 'USER_NOT_PERMISSIONS' }, 403); return
    }

    next()
  } catch (error) {
    httpErrorHandler(res, { message: 'ERROR_PERMISSION' }, 403)
  }
}

export {
  checkRol
}
