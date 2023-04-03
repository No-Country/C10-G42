import type { NextFunction, Request, Response } from 'express'

import { httpErrorHandler } from '../utils/httpErrorHandler'

const checkRol =
  (roles: string[]) =>
  (req: Request, res: Response, next: NextFunction): void => {
    try {
      const userRole = req.user?.role
      if (userRole == null) {
        httpErrorHandler(res, { message: 'ERROR_ROLE' }, 403)
        return
      }

      const checkRoleValue = roles.some(allowedRole =>
        userRole.includes(allowedRole)
      )
      if (!checkRoleValue) {
        httpErrorHandler(res, { message: 'USER_NOT_PERMISSIONS' }, 403)
        return
      }

      next()
    } catch (error) {
      httpErrorHandler(res, { message: 'ERROR_PERMISSION' }, 403)
    }
  }

export { checkRol }
