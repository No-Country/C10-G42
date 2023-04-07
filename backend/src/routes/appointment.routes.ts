import { Router } from 'express'

import {
  createAppointment,
  deleteAppointment,
  getAllAppointments,
  getAppointment,
  getAppointmentsDoctor,
  getAppointmentsPatient,
  updateAppointment
} from '../controllers/appointment.controller'
import { checkRol } from '../middlewares/role'
import { authMiddleware } from '../middlewares/session'
import {
  validatorCreate,
  validatorUpdate
} from '../middlewares/validators/appointment.valid'

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
  .get(authMiddleware, checkRol(['doctor', 'patient']), getAppointment)
  .put(authMiddleware, checkRol(['doctor']), validatorUpdate, updateAppointment)
  .delete(authMiddleware, checkRol(['doctor']), deleteAppointment)

router.route('/doctor/:id').get(getAppointmentsDoctor)

router.route('/patient/:id').get(getAppointmentsPatient)

export { router }
