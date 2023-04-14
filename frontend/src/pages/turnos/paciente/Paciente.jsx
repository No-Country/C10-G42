import React, {useState, useEffect} from 'react'
import './index.css'
import {Typography} from '@mui/material'
import Doctors from '../../../components/contact-form/doctors/Doctors'

const Paciente = () => {

    const [doctors, setDoctors] = useState([]);
    const [selectedDoctorId, setSelectedDoctorId] = useState("");
    const [specialty,setSpecialty] = useState([])
    const [dateDoctor,setDateDoctor] = useState([]);
    const [dateSelectedDoctor,setDateSelectedDoctor] = useState("");
    const [schedules,setSchedule]=useState([]);
    
    // const [doctorDay,setDoctorDay] = useState=("");

    useEffect(() => {
        fetch("https://consultoriomern.onrender.com/api/doctor/")
            .then(res => res.json())
            .then(data => 
                setDoctors(data)
            );
    }, []);


    const handleSpecialtySelectChange = (event) => {
        setSelectedDoctorId(event.target.value)
        const selectedDoctorId = event.target.value;
        event.preventDefault();
        fetch(`https://consultoriomern.onrender.com/api/doctor/specialty/list/${selectedDoctorId}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            setSpecialty(data);
      
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
      
    


      const handleDoctorSelectChange = (e) => {
        
          const specialtySelected=e.target.value;
          e.preventDefault()      
          fetch(`https://consultoriomern.onrender.com/api/doctorschedule/doctor/${specialtySelected}`)
          .then((res)=>{
            return (res.json())
          }).then((data)=>{
            setDateDoctor(data)
          })
        }


        const handleDateSelectChange = (e) => {
            setDateSelectedDoctor(e.target.value)
            const selectedDate = e.target.value;
            const selectedDoctorId = e.target.selectedOptions[0].id;
            e.preventDefault();
            fetch(`https://consultoriomern.onrender.com/api/appointment/available/${selectedDoctorId}?date=${selectedDate}`)
              .then((res) => res.json())
              .then((data) => {
                setSchedule(data)
              })
              .catch((error) => {
                console.error("Error:", error);
              });
          }


   
    return (
        <div>
            <article className="paciente-container">
                <Typography variant="h5" align='center'>TURNOS</Typography>
                <div className="selectores">
                    <div className="doctores">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Especialidad</label>
                        <select id="doctor-select" onChange={handleSpecialtySelectChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option selected="selected">Elige un servicio</option>
                            {doctors.map((doctor) => (
                                <option key={doctor._id} value={doctor.specialty}>{doctor.specialty}</option>
                            ))}
                        </select>
                    </div>
                    <div className="coberturas">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Doctores</label>
                        <select
                            id="esperc" onChange={handleDoctorSelectChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option selected="selected">Elige un doctor</option>
                            {specialty.map((specialty) =>{
                            return(
                             <option key={specialty._id} value={specialty._id}>{specialty.name}</option>  
                        )})}  
                        </select>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fechas</label>
                       
                        <select id="doctor" onChange={handleDateSelectChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option selected="selected" >Elige la fecha</option>
                        {
                            dateDoctor.map((date,index)=>{

                            
                                return(
                              
                            <option key={index} id={date.doctor} value={date.day}>{date.day.substring(0, 10)}</option>
                          
                                )
                            })
                        }
                          </select>
                    </div>
                </div>
       
                <div className="horarios">
                <div className="days" >

                <Typography variant='h6'  className='text-white'>{dateSelectedDoctor.substring(0,10)}</Typography>
                </div>
                <div className="time">
                {schedules.map((schedules,index)=>{
                    return(
                <a  key={index} className=" text-sm bg-blue-100 p-2 rounded text-blue-600  hover:bg-blue-200 hover:text-blue-900" href="">{schedules.startTime}</a>
                )})
            }
                </div>
    
                </div>
             
                <Doctors/>
            </article>
        </div>   
    )
}
export default Paciente