import { type Appointment } from '../interfaces/Appointment'
import { type DoctorSchedule } from '../interfaces/DoctorSchedule'

const getAvailableAppointments = (
  doctorSchedule: DoctorSchedule,
  appointments: Appointment[]
): any[] => {
  const availableAppointments: any[] = []

  // Convertir la hora de entrada y salida a minutos
  const entradaEnMinutos: number = hourToMinutes(doctorSchedule.startTime)
  const salidaEnMinutos: number = hourToMinutes(doctorSchedule.endTime)

  // Calcular la cantidad de turnos disponibles
  const cantidadTurnos = Math.floor(
    (salidaEnMinutos - entradaEnMinutos) / doctorSchedule.interval
  )

  // Crear un array con los turnos disponibles
  const turnosDisponibles = Array.from(
    { length: cantidadTurnos },
    (_, i) => entradaEnMinutos + i * doctorSchedule.interval
  )

  // Filtrar los turnos disponibles que no están ocupados
  turnosDisponibles.forEach(turno => {
    const turnoOcupado = appointments.some(appointment => {
      const horaInicioEnMinutos = hourToMinutes(appointment.startTime)
      const horaFinEnMinutos = horaInicioEnMinutos + appointment.duration

      return turno >= horaInicioEnMinutos && turno < horaFinEnMinutos
    })

    if (!turnoOcupado) {
      const startTime = minutesToHour(turno)
      const date = doctorSchedule.day
      availableAppointments.push({
        date,
        startTime,
        duration: doctorSchedule.interval,
        patient: null,
        doctor: doctorSchedule.doctor
      })
    }
  })

  return availableAppointments
}

const hourToMinutes = (hora: string): number => {
  const [horaStr, minutosStr] = hora.split(':')
  const horaEnMinutos = parseInt(horaStr) * 60
  const minutos = parseInt(minutosStr)
  return horaEnMinutos + minutos
}

const minutesToHour = (minutos: number): string => {
  const horas = Math.floor(minutos / 60)
  const minutosRestantes = minutos % 60
  return `${horas.toString().padStart(2, '0')}:${minutosRestantes
    .toString()
    .padStart(2, '0')}`
}

export { getAvailableAppointments, hourToMinutes, minutesToHour }
