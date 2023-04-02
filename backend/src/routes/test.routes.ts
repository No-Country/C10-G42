import { Router } from 'express'
import { authMiddleware } from '../middlewares/session'
import { checkRol } from '../middlewares/role'

const router = Router()

// router.get('/', (req, res) => { res.send('ok') })
router.get('/', authMiddleware, checkRol(['patient', 'admin']), (req, res) => { res.send('ok') })
// router.post('/ola', test2)

export { router }
