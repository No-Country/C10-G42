import { Router } from 'express'

import {
  deleteDoctor,
  getAllDoctors,
  getDoctor,
  updateDoctor
} from '../controllers/doctor.controller'
import { checkRol } from '../middlewares/role'
import { authMiddleware } from '../middlewares/session'
import { validatorUpdate } from '../middlewares/validators/doctor.valid'

const router = Router()

router.get('/', getAllDoctors)

router
  .route('/:id')
  .get(getDoctor)
  .put(authMiddleware, checkRol(['doctor', 'admin']), validatorUpdate, updateDoctor)
  .delete(authMiddleware, checkRol(['admin']), deleteDoctor)

export { router }
