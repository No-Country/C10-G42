import { useEffect, useState } from 'react';
import './index.css';
import { Link } from 'react-router-dom';

import useAuth from '../../../hooks/useAuth';
import usePatient from '../../../hooks/usePatient';
import AppointmentList from '../../../components/dashboard/AppointmentList';

const AppointmentPatient = () => {
  const {
    auth: { user },
  } = useAuth();
  const { appointmentList, getAppointment, pages, page, setPage, itemsCount } =
    usePatient();

  useEffect(() => {
    console.log('call', page, user.patientID);
    const get = async () => {
      await getAppointment(user.patientID, page);
    };
    get();
  }, [page]);

  return appointmentList && appointmentList?.items?.length > 0 ? (
    <div className='m-auto w-full'>
      <div className='flex justify-center'>
        <AppointmentList
          turnos={appointmentList?.items}
          user={user}
          pages={pages}
          page={page}
          setPage={setPage}
          itemsCount={itemsCount}
        />
      </div>
    </div>
  ) : (
    <div>No se encontraron turnos registrados</div>
  );
};
export default AppointmentPatient;
