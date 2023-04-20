import { useEffect, useState } from 'react';
import './index.css';
import { Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import usePatient from '../../../hooks/usePatient';
import { AppointmentList } from '../../../components';
import Loading from '../../../components/Loading';

const AppointmentPatient = () => {
  const {
    auth: { user },
  } = useAuth();
  const {
    appointmentList,
    getAppointment,
    pages,
    page,
    setPage,
    itemsCount,
    loading,
  } = usePatient();
  const [startDate, setStartDate] = useState({
    startDate: '',
    endDate: '',
  });

  useEffect(() => {
    const get = async () => {
      await getAppointment(user.patientID, page, startDate);
    };
    get();
  }, [page, startDate]);

  return (
    <div className='m-auto w-full'>
      <div className='flex justify-center'>
        <div className='w-full h-3/4 bg-white rounded-lg shadow-lg lg:w-3/4 p-5'>
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
          {appointmentList?.items?.length > 0 ? (
            <AppointmentList
              turnos={appointmentList?.items}
              pages={pages}
              page={page}
              setPage={setPage}
              itemsCount={itemsCount}
              loading={loading}
              startDate={startDate}
              setStartDate={setStartDate}
            />
          ) : (
            <div>No se encontraron turnos registrados</div>
          )}
        </div>
      </div>
    </div>
  );
};
export default AppointmentPatient;
