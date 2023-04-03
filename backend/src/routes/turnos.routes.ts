import { Router } from 'express'

import { createAppointment } from '../controllers/turno.controller'

const router = Router()

router.post('/sacar-turno', createAppointment)

export { router }
