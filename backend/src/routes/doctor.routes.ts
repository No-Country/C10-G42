import { Router } from 'express'

import {
  deleteDoctor,
  getAllDoctors,
  getAllDoctorsPaginated,
  getDoctor,
  getRandomDoctors,
  getSpecialty,
  getSpecialtyDoctorArray,
  updateDoctor
} from '../controllers/doctor.controller'
import { authMiddleware } from '../middlewares/session'
import { checkUserOrRol } from '../middlewares/user'
import { validatorUpdate } from '../middlewares/validators/doctor.valid'

const router = Router()

router.get('/', getAllDoctors)
router.get('/paginated', getAllDoctorsPaginated)
router.get('/specialty', getSpecialty)
router.get('/specialty/list/:specialty', getSpecialtyDoctorArray)
router.get('/random/:limit', getRandomDoctors)

router
  .route('/:id')
  .get(getDoctor)
  .put(authMiddleware, checkUserOrRol(['admin']), validatorUpdate, updateDoctor)
  .delete(authMiddleware, checkUserOrRol(['admin']), deleteDoctor)

export { router }
