import type { NextFunction, Request, Response } from 'express'

import { httpErrorHandler } from '../utils/httpErrorHandler'

const checkRol =
  (roles: string[]) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const userRole = req.user?.role
    if (userRole == null) {
      httpErrorHandler(res, { message: 'ERROR_NOT_AUTHORIZED' }, 401)
      return
    }
    const checkRoles = roles.some(rolSingle => userRole.includes(rolSingle))

    if (!checkRoles) {
      httpErrorHandler(
        res,
        { message: 'ERROR_PERMISSIONS_ROL_NOT_ACCEPTED' },
        403
      )
      return
    }

    next()
  }

export { checkRol }
