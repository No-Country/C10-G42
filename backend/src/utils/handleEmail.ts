import * as nodemailer from 'nodemailer'

import { URL_FRONTEND, transportOptions } from '../config/config'

export const sendVerifyMail = async (
  email: string,
  firstname: string,
  code: string
): Promise<void> => {
  const transport = nodemailer.createTransport(transportOptions)

  await transport.sendMail({
    from: 'Consultorio MERN <consultoriomern@gmail.com>',
    to: email,
    subject: 'Comprueba tu cuenta',
    text: 'Comprueba tu cuenta',
    html: `
		<h3>¡Hola <b>${firstname}!</b></h3>
		<p>Bienvenido a Consultorio Mern. Valida tu cuenta clickeando el enlace:</p>
		<a href="${URL_FRONTEND}/confirmar/${code}">Comprobar cuenta</a>
		<p>Si usted no ha creado esta cuenta, puede ignorar este correo.</p>
	`
  })
}

export const sendMailForgotPassword = async (
  email: string,
  firstname: string,
  code: string
): Promise<void> => {
  const transport = nodemailer.createTransport(transportOptions)

  await transport.sendMail({
    from: 'Consultorio MERN <consultoriomern@gmail.com>',
    to: email,
    subject: 'Reestablece tu contraseña',
    text: 'Reestablece tu contraseña',
    html: `
		<h3>¡Hola <b>${firstname}!</b></h3>
		<p>Has solicitado reestablecer tu contraseña.</p>
    <p>Sigue el siguiente enlace para generar una nueva contraseña: </p>
		<a href="${URL_FRONTEND}/olvide-password/${code}">Reestablecer contraseña</a>
		<p>Si usted no ha solicitado este proceso, puede ignorar este correo.</p>
	`
  })
}


export const sendAppointmentEmail = async (
  email: string,
  firstname: string,
  data: any
): Promise<void> => {
  const transport = nodemailer.createTransport(transportOptions)

  await transport.sendMail({
    from: 'Consultorio MERN <consultoriomern@gmail.com>',
    to: email,
    subject: 'Tu cita ha sido creada',
    text: 'Tu cita ha sido creada',
    html: `
		<h3>¡Hola <b>${firstname}!</b></h3>
		<p>Has solicitado un turno con el Doctor ${data.doctor} de la especialidad ${data.specialty}.</p>
    <p>El turno es para el dia ${data.date} a las ${data.startTime} y tiene una duracion de ${data.duration} minutos.</p>
    <p>Para cancelar el turno, ingresa a tu cuenta y selecciona la opcion "Mis turnos".</p>
	`
  })
}
