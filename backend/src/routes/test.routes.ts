import { Router } from 'express'

import { checkRol } from '../middlewares/role'
import { authMiddleware } from '../middlewares/session'

const router = Router()

// router.get('/', (req, res) => { res.send('ok') })
router.get('/', authMiddleware, checkRol(['patient', 'doctor']), (req, res) => {
  res.send('ok')
})
// router.post('/ola', test2)

export { router }
