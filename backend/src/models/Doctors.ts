import mongoose from 'mongoose'

import { type Doctor } from './../interfaces/Doctor'

const DoctorSchema = new mongoose.Schema<Doctor>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    name: {
      type: String,
      required: true
    },
    specialty: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    photoUrl: {
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
