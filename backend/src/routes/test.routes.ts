import { Router } from 'express'

import { checkRol } from '../middlewares/role'
import { authMiddleware } from '../middlewares/session'

const router = Router()

router.get('/', authMiddleware, checkRol(['patient', 'doctor']), (req, res) => {
  res.send('ok')
})

export { router }
