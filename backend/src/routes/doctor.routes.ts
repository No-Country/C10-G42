import { Router } from 'express'

import { doctorCtrl } from '../controllers/doctor.controller'

const router = Router()

router.route('/').get(doctorCtrl.getAll).post(doctorCtrl.create)
router
  .route('/:id')
  .get(doctorCtrl.get)
  .put(doctorCtrl.update)
  .delete(doctorCtrl.delete)

export { router }
