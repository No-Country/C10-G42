import mongoose from "mongoose";
import { DoctorSchedule } from '../interfaces/DoctorSchedule';

const DoctorScheduleSchema = new mongoose.Schema<DoctorSchedule>(
  {
    day: {
		type: String,
		enum: ["Mon", "tue", "wed", "thu", "fri"],
		required: true
	},
	starttime: {
		type: String,
		required: true
	},
	endtime: {
		type: String,
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
    versionKey: false,
  }
)

DoctorScheduleSchema.index({day: 1, doctor: 1}, {unique: true});

const DoctorScheduleModel = mongoose.model("DoctorSchedule", DoctorScheduleSchema);

export default DoctorScheduleModel;