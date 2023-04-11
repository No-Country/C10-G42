import { type NextFunction, type Request, type Response } from 'express'

import { httpErrorHandler } from '../utils/httpErrorHandler'

const checkUserOrRol =
  (roles: string[]) => (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.user?.role
    const id = req.userId
    if (userRole == null || id == null) {
      httpErrorHandler(res, { message: 'ERROR_NOT_AUTHORIZED' }, 401)
      return
    }

    const checkRoles = roles.some(rolSingle => userRole.includes(rolSingle))

    if (req.params.id !== id) {
      if (!checkRoles) {
        httpErrorHandler(
          res,
          { message: 'ERROR_PERMISSIONS_ROL_NOT_ACCEPTED' },
          403
        )
        return
      } else {
        next()
        return
      }
    }

    next()
  }

export { checkUserOrRol }
