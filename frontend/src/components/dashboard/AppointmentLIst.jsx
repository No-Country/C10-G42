import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Datepicker from 'react-tailwindcss-datepicker';

const AppointmentList = ({
  turnos,
  user,
  pages,
  page,
  setPage,
  itemsCount,
}) => {
  const [startDate, setStartDate] = useState({
    startDate: new Date(),
    endDate: new Date().setMonth(11),
  });

  //date range
  const handleValueChange = (newValue) => {
    console.log('newValue:', newValue);
    setStartDate(newValue);
  };

  //paginations

  const [pageCount, setPageCount] = useState(pages);
  console.log('page:', page, 'pagesC', pages, pageCount);

  useEffect(() => {
    const changePage = () => {
      if (turnos.length > 0) {
        setPageCount(pages);
      }
    };

    changePage();
  }, [turnos, page]);

  function handlePrevious() {
    setPage((p) => {
      if (p === 1) return p;
      return p - 1;
    });
  }

  function handleNext() {
    setPage((p) => {
      if (p === pageCount) return p;
      return p + 1;
    });
  }

  return (
    <div className='w-full bg-white rounded-lg shadow-lg lg:w-3/4 p-5'>
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
      <ul className='divide-y-2 divide-gray-100'>
        {turnos.map((turno) => (
          <li
            className='p-3 hover:bg-main hover:text-blue-200 cursor-pointer'
            key={turno._id}>
            <div className='md:flex md:justify-between'>
              <p>
                <b>Fecha: </b>
                {new Date(turno.date).toLocaleDateString('es-AR', {
                  timeZone: 'UTC',
                })}
              </p>
              <p>
                <b>Hora inicio: </b> {turno.startTime}
              </p>

              <div>
                <p>
                  <b>Doctor: </b> {turno.doctor.name}
                </p>
                <p>
                  <b>Especialidad: </b> {turno.doctor.specialty}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <hr className='border border-blue-pastel-100 w-full' />
      {/*** Paginacion ***/}
      <div className='flex flex-col items-center justify-center m-auto'>
        <span className='text-sm text-gray-700'>
          Pagina <span className='font-semibold text-gray-900 '>{page}</span> de{' '}
          <span className='font-semibold text-gray-900'>{pageCount}</span> -
          Total:{' '}
          <span className='font-semibold text-gray-900'>{itemsCount}</span>{' '}
          Turnos
        </span>
        <div className='inline-flex mt-2 xs:mt-0 bg-main'>
          <button
            className={`py-2 px-4 text-sm font-medium text-white rounded-l hover:bg-secondary'
                ${page === 1 && 'opacity-25'}`}
            onClick={handlePrevious}
            disabled={page === 1}>
            <span className='text-xl font-bold'>{'<'}</span>
          </button>

          <button
            className={`ml-1 py-2 px-4 text-sm font-medium text-white hover:bg-secondary'
           rounded-r border-0 border-l  
           ${page === pageCount && 'opacity-25'}`}
            disabled={page === pageCount}
            onClick={handleNext}>
            <span className='text-xl font-bold'>{'>'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
export default AppointmentList;
