import { Router } from 'express'
import { doctorController } from '../controllers/doctor.controller'

const router = Router()

router.route('/')
  .get(doctorController.getDoctors)
  .post(doctorController.createDoctor)
router.route('/:id')
  .get(doctorController.getDoctor)
  .put(doctorController.updateDoctor)
  .delete(doctorController.deleteDoctor)

export { router }
