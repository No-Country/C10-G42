import { Router } from 'express'
import { getPatients } from '../controllers/patient.controller'

const router = Router()

router.get('/', getPatients)

export { router }
