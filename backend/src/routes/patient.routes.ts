import { Router } from 'express'

import {
  createPatient,
  deletePatient,
  getAllPatients,
  getPatient,
  updatePatient
} from '../controllers/patient.controller'
import { checkRol } from '../middlewares/role'
import { authMiddleware } from '../middlewares/session'
import { validatorUpdate } from '../middlewares/validators/appointment.valid'

const router = Router()

router
  .route('/')
  .get(authMiddleware, checkRol(['doctor']), getAllPatients)
  .post(createPatient)

router
  .route('/:id')
  .get(authMiddleware, checkRol(['doctor', 'patient']), getPatient)
  .put(authMiddleware, checkRol(['patient']), validatorUpdate, updatePatient)
  .delete(authMiddleware, checkRol(['patient']), deletePatient)

export { router }
