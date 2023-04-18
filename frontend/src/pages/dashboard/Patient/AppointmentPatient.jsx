import { useState } from 'react';
import './index.css';
import { Link } from 'react-router-dom';
import AppointmentLIst from '../../../components/dashboard/AppointmentLIst';
import useAuth from '../../../hooks/useAuth';

const AppointmentPatient = () => {
  const {
    auth: { user },
  } = useAuth();
  const turnos = ['Turno 1', 'Turno 2', 'Turno 3', 'Turno 4'];

  return (
    <div className='m-auto w-full'>
      <div className='flex justify-center'>
        <AppointmentLIst
          turnos={turnos}
          user={user}
        />
      </div>
    </div>
  );
};
export default AppointmentPatient;
