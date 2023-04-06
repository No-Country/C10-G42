import mongoose from 'mongoose'

import { type DoctorSchedule } from '../interfaces/DoctorSchedule'

const DoctorScheduleSchema = new mongoose.Schema<DoctorSchedule>(
  {
    dia: {
      type: String,
      enum: ['Mon', 'tue', 'wed', 'thu', 'fri'],
      required: true
    },
    entrada: {
      type: String,
      required: true
    },
    salida: {
      type: String,
      required: true
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor',
      required: true
    },
    turnos: {
      type: [String],
      required: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

DoctorScheduleSchema.index({ day: 1, doctor: 1 }, { unique: true })

const DoctorScheduleModel = mongoose.model(
  'DoctorSchedule',
  DoctorScheduleSchema
)

export default DoctorScheduleModel
