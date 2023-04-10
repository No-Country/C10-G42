import { type Appointment } from '../../interfaces/Appointment'

export interface AppointmentPaginated {
  pagination: {
    itemsCount: number
    pageCount: number
  }
  items: Appointment[]
}
