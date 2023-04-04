import mongoose from 'mongoose'

import { type User } from '../interfaces/User'

const UserSchema = new mongoose.Schema<User>(
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
      default: 'patient'
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

const UserModel = mongoose.model('Users', UserSchema)

export default UserModel
