import { Router } from 'express'

import {
  createAppointment,
  deleteAppointment,
  getAllAppointments,
  getAppointment,
  updateAppointment
} from '../controllers/appointment.controller'
//import { checkRol } from '../middlewares/role'

const router = Router()

router.route('/').get(getAllAppointments).post(createAppointment)
router.route('/:id')
  .get(getAppointment)
  .put(updateAppointment)
  .delete(deleteAppointment)

export { router }
