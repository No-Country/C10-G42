import { Router } from 'express'

import {
  createSchedule,
  deleteSchedule,
  getAllSchedules,
  getSchedule,
  getAvailable,
  updateSchedule
} from '../controllers/doctor.schedule.controller'
import { checkRol } from '../middlewares/role'
import { authMiddleware } from '../middlewares/session'
import {
  validatorCreate,
  validatorUpdate
} from '../middlewares/validators/schedule.valid'

const router = Router()

router
  .route('/')
  .get(getAllSchedules)
  .post(authMiddleware, checkRol(['doctor']), validatorCreate, createSchedule)

router
  .route('/:id')
  .get(getSchedule)
  .put(authMiddleware, checkRol(['doctor']), validatorUpdate, updateSchedule)
  .delete(authMiddleware, checkRol(['doctor']), deleteSchedule)

router
  .route('/:idMedico')
  .post(getAvailable)

export { router }
