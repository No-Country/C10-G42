import { Router } from 'express'

import testController from '../controllers/test.controller'
import { checkRol } from '../middlewares/role'
import { authMiddleware } from '../middlewares/session'

const router = Router()

router.get('/', authMiddleware, checkRol(['patient']))
router.get('/', testController.test1)
router.post('/', testController.test2)

export { router }
