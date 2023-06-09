import mongoose from 'mongoose'

import { type Patient } from '../interfaces/Patient'

const PatientSchema = new mongoose.Schema<Patient>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    username: {
      type: String,
      required: true
    },
    dni: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

const PatientModel = mongoose.model('Patient', PatientSchema)

export default PatientModel
