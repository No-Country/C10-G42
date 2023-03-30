import mongoose from 'mongoose'
import { type Patient } from '../interfaces/Patient'

const PatientSchema = new mongoose.Schema<Patient>(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    firstname: {
      type: String,
      required: true
    },
    lastname: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ['patient', 'doctor', 'admin'],
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

const PatientModel = mongoose.model('Pacientes', PatientSchema)

export default PatientModel
