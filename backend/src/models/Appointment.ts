import mongoose from 'mongoose'

import { type Appointment } from '../interfaces/Appointment'

const AppointmentSchema = new mongoose.Schema<Appointment>(
  {
    fecha: {
      type: Date,
      required: true
    },
    horaInicio: {
      type: Number,
      required: true,
      min: 0,
      max: 23
    },
    minutoInicio: {
      type: Number,
      required: true,
      min: 0,
      max: 59
    },
    duracion: {
      type: Number,
      default: 60
    },
    paciente: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Paciente',
      required: true
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Paciente',
      required: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

AppointmentSchema.index({ fecha: 1, horaInicio: 1, minutoInicio: 1, doctor: 1 }, { unique: true })

const AppointmentModel = mongoose.model('Appointment', AppointmentSchema)

export default AppointmentModel
