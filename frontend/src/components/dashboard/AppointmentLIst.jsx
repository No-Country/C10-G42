import { useState } from 'react';
import { Link } from 'react-router-dom';
import Datepicker from 'react-tailwindcss-datepicker';

const AppointmentLIst = ({ turnos, user }) => {
  const [startDate, setStartDate] = useState({
    startDate: new Date(),
    endDate: new Date().setMonth(11),
  });

  const handleValueChange = (newValue) => {
    console.log('newValue:', newValue);
    setStartDate(newValue);
  };
  return (
    <div class='w-full bg-white rounded-lg shadow-lg lg:w-3/4 p-5'>
      <span className='flex justify-between my-2'>
        <h3 className='text-2xl font-bold'>Mis turnos</h3>
        {user.role === 'patient' && (
          <Link
            to='/turnos'
            className='flex justify-center bg-main hover:bg-secondary text-white p-2 ml-auto rounded-md'>
            Crear turnos
          </Link>
        )}
      </span>
      <hr />
      {/* Fecha */}
      <span
        className='mt-10'
        id='datePicker'>
        <Datepicker
          i18n={'es'}
          displayFormat={'DD/MM/YYYY'}
          value={startDate}
          onChange={handleValueChange}
        />
      </span>
      {/* Turnos */}
      <ul class='divide-y-2 divide-gray-100'>
        {turnos.map((turno) => (
          <li class='p-3 hover:bg-main hover:text-blue-200 cursor-pointer'>
            {turno}
          </li>
        ))}
      </ul>

      <div class='flex flex-col items-center'>
        {/* Help text  */}
        <span class='text-sm '>
          Mostrando <span class='font-semibold'>1</span> -{' '}
          <span class='font-semibold t dark:text-white'>10</span> de{' '}
          <span class='font-semibold text-gray-900 dark:text-white'>100</span>{' '}
          Registros
        </span>
        {/* Buttons */}
        <div class='inline-flex mt-2 xs:mt-0'>
          <button class='px-4 py-2 text-sm font-medium text-white bg-main rounded-l hover:bg-secondary dark:hover:text-white'>
            Prev
          </button>
          <button class='px-4 py-2 text-sm font-medium text-white bg-main border-0 border-l rounded-r hover:bg-secondary dark:hover:text-white'>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
export default AppointmentLIst;
