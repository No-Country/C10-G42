import { Router } from 'express'
import { getDoctor, getDoctors, createDoctor, updateDoctor, deleteDoctor } from '../controllers/doctor.controller'
import { authMiddleware } from '../middlewares/session'
import { checkRol } from '../middlewares/role'

const router = Router()

router.get('/', getDoctors)
router.post('/', authMiddleware, checkRol(['admin']), createDoctor)

router.get('/', getDoctor)
router.put('/', authMiddleware, checkRol(['admin']), updateDoctor)
router.delete('/', authMiddleware, checkRol(['admin']), deleteDoctor)

export { router }
