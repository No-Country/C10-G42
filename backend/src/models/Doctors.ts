import mongoose from 'mongoose'

import { type Doctor } from './../interfaces/Doctor'

const DoctorSchema = new mongoose.Schema<Doctor>(
  {
    especialty: {
      type: String,
      required: true
    },
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
      default: 'doctor'
    },
    phone: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

const DoctorModel = mongoose.model('Doctor', DoctorSchema)
export default DoctorModel
