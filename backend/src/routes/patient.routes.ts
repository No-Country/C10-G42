import { Router } from 'express'

import {
  deletePatient,
  getAllPatients,
  getPatient,
  updatePatient
} from '../controllers/patient.controller'
import { checkRol } from '../middlewares/role'
import { authMiddleware } from '../middlewares/session'
import { checkUserOrRol } from '../middlewares/user'
import { validatorUpdate } from '../middlewares/validators/patient.valid'

const router = Router()

router.route('/').get(authMiddleware, checkRol(['doctor']), getAllPatients)

router
  .route('/:id')
  .get(authMiddleware, checkUserOrRol(['doctor']), getPatient)
  .put(authMiddleware, checkUserOrRol([]), validatorUpdate, updatePatient)
  .delete(authMiddleware, checkUserOrRol([]), deletePatient)

export { router }
