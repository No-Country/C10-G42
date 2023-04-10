import { Router } from 'express'

import {
  createAppointment,
  deleteAppointment,
  getAllAppointments,
  getAppointment,
  getAppointmentsDoctor,
  getAppointmentsPatient,
  getAvailable,
  updateAppointment
} from '../controllers/appointment.controller'
import { checkRol } from '../middlewares/role'
import { authMiddleware } from '../middlewares/session'
import {
  validatorCreate,
  validatorUpdate
} from '../middlewares/validators/appointment.valid'
import { checkUserOrRol } from '../middlewares/user'

const router = Router()

router
  .route('/')
  .get(authMiddleware, checkRol(['doctor']), getAllAppointments)
  .post(
    authMiddleware,
    checkRol(['doctor', 'patient']),
    validatorCreate,
    createAppointment
  )

router
  .route('/:id')
  .get(authMiddleware, checkUserOrRol(['doctor', 'admin']), getAppointment)
  .put(authMiddleware, checkUserOrRol(['doctor']), validatorUpdate, updateAppointment)
  .delete(authMiddleware, checkUserOrRol(['doctor']), deleteAppointment)

router
  .route('/doctor/:id')
  .get(authMiddleware, checkRol(['doctor']), getAppointmentsDoctor)

router
  .route('/patient/:id')
  .get(authMiddleware, checkUserOrRol(['doctor']), getAppointmentsPatient)

router.route('/:idDoctor').post(getAvailable)

export { router }
