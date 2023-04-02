import { Router } from 'express'
import { createPatient, deletePatient, getAllPatients, getPatient, updatePatient } from '../controllers/patient.controller'

const router = Router()

router.get('/', getAllPatients)
router.post('/', createPatient)

router.get('/:id', getPatient)
router.post('/:id', createPatient)
router.put('/:id', updatePatient)
router.delete('/:id', deletePatient)

export { router }
