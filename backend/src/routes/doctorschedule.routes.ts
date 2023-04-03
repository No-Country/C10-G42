import { Router } from 'express'

import { doctorScheduleCtrl } from '../controllers/doctor.schedule.controller'

const router = Router()

router.route('/').get(doctorScheduleCtrl.getAll).post(doctorScheduleCtrl.create)
router
  .route('/:id')
  .get(doctorScheduleCtrl.get)
  .put(doctorScheduleCtrl.update)
  .delete(doctorScheduleCtrl.delete)

export { router }
