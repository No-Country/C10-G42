import mongoose from 'mongoose'

import { type DoctorSchedule } from '../interfaces/DoctorSchedule'

const DoctorScheduleSchema = new mongoose.Schema<DoctorSchedule>(
  {
    day: {
      type: Date,
      required: true
    },
    startTime: {
      type: String,
      required: true
    },
    endTime: {
      type: String,
      required: true
    },
    interval: {
      type: Number,
      required: true
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor',
      required: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

const DoctorScheduleModel = mongoose.model(
  'DoctorSchedule',
  DoctorScheduleSchema
)

export default DoctorScheduleModel
