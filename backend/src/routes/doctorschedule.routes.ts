import { Router } from 'express'
import { doctorScheduleController } from '../controllers/doctor.schedule.controller'

const router = Router()

router.route('/')
  .get(doctorScheduleController.getAll)
  .post(doctorScheduleController.create)
router.route('/:id')
  .get(doctorScheduleController.get)
  .put(doctorScheduleController.update)
  .delete(doctorScheduleController.delete)

export { router }
