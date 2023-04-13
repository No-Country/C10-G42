import * as nodemailer from 'nodemailer'

import { URL_FRONTEND, transportOptions } from '../config/config'

export const sendVerifyMail = async (
  email: string,
  firstname: string,
  code: string
): Promise<void> => {
  const transport = nodemailer.createTransport(transportOptions)

  await transport.sendMail({
    from: '"Administrador de proyectos" <cuentas@correo.com>',
    to: email,
    subject: 'Comprueba tu cuenta',
    text: 'Comprueba tu cuenta',
    html: `
		<h3>Hola <b>${firstname}!</b></h3>
		<p>bienvenido a Consultorio Mern. Valida tu cuenta clickeando el enlace:</p>
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
    from: '"administrador" <cuentas@correo.com>',
    to: email,
    subject: 'Reestablece tu contraseña',
    text: 'Reestablece tu contraseña',
    html: `
		<h3>Hola <b>${firstname}!</b></h3>
		<p>has solicitado reestablecer tu contraseña.</p>
    <p>Sigue el siguiente enlace para generar una nueva contraseña: </p>
		<a href="${URL_FRONTEND}/olvide-password/${code}">Reestablecer contraseña</a>
		<p>Si usted no ha solicitado este proceso, puede ignorar este correo.</p>
	`
  })
}
