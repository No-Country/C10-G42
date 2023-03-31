import { ObjectId } from 'mongoose';
export interface DoctorSchedule {
	day: string
	starttime: string
	endtime: string,
	doctor?: ObjectId,
}