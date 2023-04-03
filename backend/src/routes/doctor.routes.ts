import { Router } from 'express'

import { doctorCtrl } from '../controllers/doctor.controller'
import { checkRol } from '../middlewares/role'

const router = Router()

router
  .route('/')
  .get(doctorCtrl.getAll)
  .post(checkRol(['admin']), doctorCtrl.create)
router
  .route('/:id')
  .get(doctorCtrl.get)
  .put(checkRol(['admin']), doctorCtrl.update)
  .delete(checkRol(['admin']), doctorCtrl.delete)

export { router }
