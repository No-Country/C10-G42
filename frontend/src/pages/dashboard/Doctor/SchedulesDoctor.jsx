import { ListItem } from '@mui/material';
import { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import clienteAxios from '../../../config/clienteAxios';
import { Link } from 'react-router-dom';
import useDoctor from '../../../hooks/useDoctor';

const SchedulesDoctor = () => {
  const {
    auth: { user },
  } = useAuth();
  const { getSchedule, schedules } = useDoctor();
  const [startDate, setStartDate] = useState({
    startDate: new Date(),
    endDate: new Date().setMonth(11),
  });

  const handleValueChange = (newValue) => {
    setStartDate(newValue);
  };

  useEffect(() => {
    const get = async () => {
      await getSchedule(user.doctorID);
    };
    get();
  }, []);

  return (
    <div className='m-auto w-full'>
      <div className='flex justify-center'>
        <div className='w-full bg-white rounded-lg shadow-lg lg:w-3/4 p-5'>
          <span className='flex justify-between my-2'>
            <h3 className='text-2xl font-bold'>Mis horarios</h3>
            <Link
              to='/dashboard/doctor/horarios/crear'
              className='flex justify-center bg-main hover:bg-secondary text-white p-2 ml-auto rounded-md'>
              Crear Horario
            </Link>
          </span>
          <hr />
          {/* Turnos */}
          <ul className='divide-y-2 divide-gray-100'>
            {schedules.map((item) => (
              <li className='bg-slate-300  flex-col gap-3 p-3'>
                <p>
                  <b>Dia:</b>{' '}
                  {new Date(item.day).toLocaleDateString('es-AR', {
                    timeZone: 'UTC',
                  })}
                </p>
                <span className='flex gap-5'>
                  <p>
                    <b>Hora Inicio: </b>
                    {item.startTime}
                  </p>
                  <p>
                    <b>Hora Fin: </b>
                    {item.endTime}
                  </p>
                </span>
                <p>
                  <b>Intervalo: </b>
                  {item.interval} Min
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default SchedulesDoctor;
