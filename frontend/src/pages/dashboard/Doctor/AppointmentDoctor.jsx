import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import useDoctor from '../../../hooks/useDoctor';
import { AppointmentList } from '../../../components';
import Loading from '../../../components/Loading';

const AppointmentDoctor = () => {
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
  } = useDoctor();
  const [startDate, setStartDate] = useState({
    startDate: '',
    endDate: '',
  });

  useEffect(() => {
    const get = async () => {
      await getAppointment(user.doctorID, page, startDate);
    };
    get();
  }, [page, startDate]);

  return (
    <div className='md:m-auto mt-20 w-full'>
      <div className='flex justify-center'>
        <div className='w-full h-3/4 bg-white rounded-lg shadow-lg lg:w-3/4 p-5'>
          <span className='flex flex-start my-2'>
            <h3 className='text-2xl font-bold'>Mis turnos</h3>
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
              user={user}
            />
          ) : (
            <div>No se encontraron turnos registrados</div>
          )}
        </div>
      </div>
    </div>
  );
};
export default AppointmentDoctor;
