import { Router } from 'express'

import {
  createDoctor,
  deleteDoctor,
  getAllDoctors,
  getDoctor,
  updateDoctor
} from '../controllers/doctor.controller'
import { checkRol } from '../middlewares/role'
import { authMiddleware } from '../middlewares/session'
import { validatorUpdate } from '../middlewares/validators/doctor.valid'

const router = Router()

router
  .route('/')
  .get(getAllDoctors)
  .post(authMiddleware, checkRol(['admin']), createDoctor)
router
  .route('/:id')
  .get(getDoctor)
  .put(
    authMiddleware,
    checkRol(['doctor', 'admin']),
    validatorUpdate,
    updateDoctor
  )
  .delete(authMiddleware, checkRol(['admin']), deleteDoctor)

export { router }
