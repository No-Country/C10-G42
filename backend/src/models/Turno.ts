import mongoose from "mongoose";
import { Appointment  } from "../interfaces/Turno";

const AppointmentSchema = new mongoose.Schema<Appointment>(
    { 
        fecha: {
            type: Date,
            required: true,
        },
        horaInicio: {
            type: Number,
            required: true,
            min: 0,
            max: 23
        },
        minutoInicio: {
            type: Number,
            required: true,
            min: 0,
            max: 59
        },
        duracion: {
            type: Number,
            required: true,
            default: 60
        },
        paciente: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Paciente',
            required: true
        },
        medico: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Paciente',
          required: true
      }
    },
    {
        timestamps: true,
        versionKey: false,
    }
)

AppointmentSchema.index({fecha: 1, hora: 1, medico: 1}, {unique: true});

const AppointmentModel = mongoose.model("Turnos", AppointmentSchema);

export default AppointmentModel;