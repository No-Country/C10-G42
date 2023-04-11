import React,{useState,useEffect}  from 'react'
import './index.css'
import { Typography } from '@mui/material'
import Doctors from '../../../components/contact-form/doctors/Doctors';


const Paciente = () => {


  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];



  // const [doctors, setDoctors] = useState(null)

  useEffect(() => {

      fetch("http://localhost:PORT/api/doctor")
          .then(
              res => res.json()
          )
          .then(data => console.log(data))

  }, [])

return(
    <div>
        <article className="paciente-container">
        <Typography variant="h5" align='center'>TURNOS </Typography>

          <div className="selectores">
          <label for="Especialidad" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Especialidad</label>
<select id="esperc" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
  <option selected>Elige un servicio</option>
  <option value="Cardiologia">cardiologia</option>
  <option value="Psi">psicologia</option>
  <option value="ped">pediatria</option>
  </select>
          <label for="Especialidad" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Especialidad</label>
<select id="doctor" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
  <option selected>Elegi algo</option>
  <option value="Cardiologia">cardiologia</option>
  <option value="Psi">psicologia</option>
  <option value="ped">pediatria</option>

</select>



<div class="text-sm text-yellow-700 mt-3 text-center bg-yellow-100 border border-yellow-500 rounded-md p-3">Para tomar un turno seleccione un servicio y una cobertura de los selectores de arriba</div>
          </div>
<div className="horarios">
  <div className="days">
<Typography variant='h6' className='text-white'>Martes 6 de julio</Typography>
  </div>
  <div className="time">
  <a class=" text-sm bg-blue-100 p-2 rounded text-blue-600" href="">09:20</a>
  <a class=" text-sm bg-blue-100 p-2 rounded text-blue-600" href="">09:20</a>
  <a class=" text-sm bg-blue-100 p-2 rounded text-blue-600" href="">09:20</a>
  </div>
  <div className="days">
<Typography variant='h6' className='text-white '>Martes 6 de julio</Typography>
  </div>
  <div className="time">
  <a class=" text-sm bg-blue-100 p-2 rounded text-blue-600" href="">09:20</a>
  <a class=" text-sm bg-blue-100 p-2 rounded text-blue-600" href="">09:20</a>
  <a class=" text-sm bg-blue-100 p-2 rounded text-blue-600" href="">09:20</a>
  </div>
</div>
<Doctors/>
        </article>
       
    </div>
  )
}


export default Paciente