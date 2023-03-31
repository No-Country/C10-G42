import { DoctorSchedule } from './../interfaces/DoctorSchedule';
import { Response } from 'express';
import { Request } from 'express';
import { doctorService } from '../services/doctor.service';
import { httpErrorHandler } from '../utils/httpErrorHandler';
import { Doctor } from './../interfaces/Doctor';
import { doctorScheduleService } from '../services/doctor.schedule.service';

const doctorScheduleController = {
	create: async (req: Request, res: Response) => { 
		try {
			const doctorScheduleData: DoctorSchedule = req.body
			const scheduleCreated = await doctorScheduleService.create(doctorScheduleData)
			res.status(201).json({ msg: "Horario medico creado correctamente", scheduleCreated })
		} catch (error) {
			httpErrorHandler(res, error, 500);
		}
	},
	get: async(req: Request, res: Response) => { 
		const { id } = req.params
		const doctorSchedule = await doctorScheduleService.get(id)
		res.json(doctorSchedule)
	},
	getAll: async(req: Request, res: Response) => {
		const { id } = req.params
		const allSchedules = await doctorScheduleService.getAll()
		res.json(allSchedules)
	},
	update: async(req: Request, res: Response) => {
		const { id } = req.params
		//day and doctor aren't duplicate
		const { starttime, endtime }: DoctorSchedule = req.body
		try {
			await doctorScheduleService.update(id, { starttime, endtime})
			res.json({msg: "Horario actualizado"})
		} catch (error) {
			httpErrorHandler(res, error, 500);
		}
	},
	delete: async(req: Request, res: Response) => {
		const { id } = req.params
		try {
			await doctorScheduleService.delete(id)
			res.json({ msg: "horario removido"})
		} catch (error) {
			httpErrorHandler(res, error, 500);
		}
	}
	
}


export {
	doctorScheduleController
}