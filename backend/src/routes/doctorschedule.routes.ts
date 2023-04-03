import { Router } from 'express'

import { doctorScheduleCtrl } from '../controllers/doctor.schedule.controller'
import { checkRol } from '../middlewares/role'

const router = Router()

router
  .route('/')
  .get(doctorScheduleCtrl.getAll)
  .post(checkRol(['doctor']), doctorScheduleCtrl.create)
router
  .route('/:id')
  .get(doctorScheduleCtrl.get)
  .put(checkRol(['doctor']), doctorScheduleCtrl.update)
  .delete(checkRol(['doctor']), doctorScheduleCtrl.delete)

export { router }
