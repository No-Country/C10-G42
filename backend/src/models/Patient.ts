import mongoose from 'mongoose'

import { type Patient } from '../interfaces/Patient'

const PatientSchema = new mongoose.Schema<Patient>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    birthdate: {
      type: Date,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
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

const PatientModel = mongoose.model('Patients', PatientSchema)

export default PatientModel
