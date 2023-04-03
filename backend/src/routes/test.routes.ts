import { Router } from 'express'
<<<<<<< HEAD

import testController from '../controllers/test.controller'
import { checkRol } from '../middlewares/role'
import { authMiddleware } from '../middlewares/session'
=======
import { authMiddleware } from '../middlewares/session'
import { checkRol } from '../middlewares/role'
>>>>>>> f4843ea4d6092826ac4aed44ab822d554b120281

const router = Router()

// router.get('/', (req, res) => { res.send('ok') })
router.get('/', authMiddleware, checkRol(['patient', 'admin']), (req, res) => { res.send('ok') })
// router.post('/ola', test2)

export { router }
