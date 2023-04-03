import { Router } from 'express'

import { patientCtrl } from '../controllers/patient.controller'

const router = Router()

router.route('/').get(patientCtrl.getAll).post(patientCtrl.create)

router
  .route('/:id')
  .get(patientCtrl.get)
  .put(patientCtrl.update)
  .delete(patientCtrl.delete)

export { router }
