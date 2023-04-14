import mongoose from 'mongoose'

import { type Appointment } from '../interfaces/Appointment'

const AppointmentSchema = new mongoose.Schema<Appointment>(
  {
    date: {
      type: Date,
      required: true
    },
    startTime: {
      type: String,
      required: true
    },
    duration: {
      type: Number,
      min: 10,
      max: 60,
      default: 30,
      required: true
    },
    patient: {
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

const AppointmentModel = mongoose.model('Appointment', AppointmentSchema)

export default AppointmentModel
