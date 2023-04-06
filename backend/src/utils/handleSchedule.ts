import { DoctorSchedule } from "../interfaces/DoctorSchedule";
import { Appointment } from "../interfaces/Appointment";

const getAvailableAppointments = (doctorSchedule: DoctorSchedule, appointments: Appointment[]): [{}] => {
  const availableAppointments: [{}] = [{}];

  // Convertir la hora de entrada y salida a minutos
  const entradaEnMinutos = hourToMinutes(doctorSchedule.entrada);
  const salidaEnMinutos = hourToMinutes(doctorSchedule.salida);

  // Calcular la cantidad de turnos disponibles
  const cantidadTurnos = Math.floor((salidaEnMinutos - entradaEnMinutos) / doctorSchedule.intervalo);

  // Crear un array con los turnos disponibles
  const turnosDisponibles = Array.from({ length: cantidadTurnos }, (_, i) => entradaEnMinutos + i * doctorSchedule.intervalo);

  // Filtrar los turnos disponibles que no están ocupados
  turnosDisponibles.forEach((turno) => {
    const turnoOcupado = appointments.some((appointment) => {
      const horaInicioEnMinutos = hourToMinutes(`${appointment.horaInicio}:${appointment.minutoInicio}`);
      const horaFinEnMinutos = horaInicioEnMinutos + appointment.duracion;
      return turno >= horaInicioEnMinutos && turno < horaFinEnMinutos;
    });

    if (!turnoOcupado) {
      const horaInicio = minutesToHour(turno);
      const minutoInicio = turno % 60;
      const fecha = doctorSchedule.dia;
      availableAppointments.push({ fecha, horaInicio, minutoInicio, duracion: doctorSchedule.intervalo, paciente: null, medico: doctorSchedule.doctor });
    }
  });

  return availableAppointments;
}


const hourToMinutes = (hora: string): number => {
  const [horaStr, minutosStr] = hora.split(':');
  const horaEnMinutos = parseInt(horaStr) * 60;
  const minutos = parseInt(minutosStr);
  return horaEnMinutos + minutos;
}

const minutesToHour = (minutos: number): string => {
  const horas = Math.floor(minutos / 60);
  const minutosRestantes = minutos % 60;
  return `${horas.toString().padStart(2, '0')}:${minutosRestantes.toString().padStart(2, '0')}`;
}

export {
  getAvailableAppointments
}