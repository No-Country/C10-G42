import { Router } from 'express'
<<<<<<< HEAD

import { patientCtrl } from '../controllers/patient.controller'

const router = Router()

router.route('/').get(patientCtrl.getAll).post(patientCtrl.create)

router
  .route('/:id')
  .get(patientCtrl.get)
  .put(patientCtrl.update)
  .delete(patientCtrl.delete)
=======
import { createPatient, deletePatient, getAllPatients, getPatient, updatePatient } from '../controllers/patient.controller'

const router = Router()

router.get('/', getAllPatients)
router.post('/', createPatient)

router.get('/:id', getPatient)
router.post('/:id', createPatient)
router.put('/:id', updatePatient)
router.delete('/:id', deletePatient)
>>>>>>> f4843ea4d6092826ac4aed44ab822d554b120281

export { router }
