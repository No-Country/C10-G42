
import { Doctor } from '../interfaces/Doctor'
import DoctorModel from '../models/Doctors'

type DoctorType = {
	_id: string,
	fullname: string,
	especialty: string,
	createdAt: string,
	updatedAt: string
}

const doctorService = {
	create:  async(doctorData: Doctor) => {
		const doctor = await DoctorModel.create(doctorData)
		return doctor
	},
	get: async(id: string) => {
		const foundDoctor = await DoctorModel.findById(id)
		if(foundDoctor) return foundDoctor
	},
	getAll: async() => {
		const foundDoctors = await DoctorModel.find()
		if(foundDoctors) return foundDoctors
	},
	update: async(id: string, doctorData: Doctor) => {
		const foundDoctor =  await DoctorModel.findById(id)
		if(foundDoctor){
			foundDoctor.fullname = doctorData.fullname,
			foundDoctor.especialty = doctorData.especialty
			const saveDoctor = await foundDoctor.save()
			return saveDoctor
		}
	},
	delete: async(id: string) => { 
		const foundDoctor =  await DoctorModel.findById(id)
		if(foundDoctor){
			await foundDoctor.deleteOne()
		}
	}
}

export {
  doctorService
}