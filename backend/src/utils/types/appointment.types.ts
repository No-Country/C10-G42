import { Appointment } from '../../interfaces/Appointment'

export type AppointmentPaginated = {
	pagination: {
		itemsCount: number
		pageCount: number
	}
	items: Appointment[]
}
