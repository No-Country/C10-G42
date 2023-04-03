import { Router } from 'express'

import {
  createDoctor,
  deleteDoctor,
  getAllDoctors,
  getDoctor,
  updateDoctor
} from '../controllers/doctor.controller'
import { checkRol } from '../middlewares/role'

const router = Router()

router
  .route('/')
  .get(getAllDoctors)
  .post(checkRol(['admin']), createDoctor)
router
  .route('/:id')
  .get(getDoctor)
  .put(checkRol(['doctor', 'admin']), updateDoctor)
  .delete(checkRol(['admin']), deleteDoctor)

export { router }
