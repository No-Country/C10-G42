import mongoose from "mongoose";
import { Doctor } from './../interfaces/Doctor';

const DoctorSchema = new mongoose.Schema<Doctor>(
  {
    fullname: {
      type: String,
      required: true
    },
    especialty: {
      type: String,
      required: true
	  }
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

const DoctorModel = mongoose.model("Doctor", DoctorSchema);

export default DoctorModel;