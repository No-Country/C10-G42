import { Router } from 'express'

import {
  deleteDoctor,
  getAllDoctors,
  getDoctor,
  getRandomDoctors,
  getSpecialty,
  updateDoctor
} from '../controllers/doctor.controller'
import { authMiddleware } from '../middlewares/session'
import { checkUserOrRol } from '../middlewares/user'
import { validatorUpdate } from '../middlewares/validators/doctor.valid'

const router = Router()

router.get('/', getAllDoctors)
router.get('/specialty', getSpecialty)
router.get('/random/:limit', getRandomDoctors)

router
.route('/:id')
.get(getDoctor)
.put(authMiddleware, checkUserOrRol(['admin']), validatorUpdate, updateDoctor)
.delete(authMiddleware, checkUserOrRol(['admin']), deleteDoctor)


export { router }
