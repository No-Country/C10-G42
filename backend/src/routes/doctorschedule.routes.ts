import { Router } from 'express'
import { createSchedule, deleteSchedule, getAllSchedules, getSchedule, updateSchedule } from '../controllers/doctor.schedule.controller'
import { authMiddleware } from '../middlewares/session'
import { checkRol } from '../middlewares/role'

const router = Router()

router.get('/', getAllSchedules)
router.post('/', authMiddleware, checkRol(['doctor']), createSchedule)

router.get('/:id', getSchedule)
router.put('/:id', authMiddleware, checkRol(['doctor']), updateSchedule)
router.delete('/:id', authMiddleware, checkRol(['doctor']), deleteSchedule)

export { router }
