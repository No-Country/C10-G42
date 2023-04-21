import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Datepicker from 'react-tailwindcss-datepicker';
import Loading from '../Loading';
import AppointmentItem from './AppointmentItem';

const AppointmentList = ({
  turnos,
  pages,
  page,
  setPage,
  itemsCount,
  loading,
  startDate,
  setStartDate,
  user,
}) => {
  //date range
  const handleValueChange = (newValue) => {
    setStartDate(newValue);
    setPage(1);
  };

  //paginations
  const [pageCount, setPageCount] = useState(pages);

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
    <>
      <hr />
      {loading ? (
        <div className='flex justify-center h-full p-10 text-main'>
          <Loading
            w={8}
            h={8}
          />
        </div>
      ) : (
        <div>
          {/* Fecha */}
          <Datepicker
            i18n={'es'}
            displayFormat={'DD/MM/YYYY'}
            placeholder={'DIA/MES/AÑO'}
            containerClassName='relative md:w-1/3 w-full text-gray-700 my-2'
            inputClassName='relative transition-all duration-300 py-2.5 pl-4 pr-14 w-full border-gray-300 rounded-lg tracking-wide font-light text-sm placeholder-gray-400 bg-slate-300 focus:ring disabled:opacity-40 disabled:cursor-not-allowed focus:border-blue-500 focus:ring-blue-500/20'
            popoverDirection='down'
            startWeekOn='mon'
            value={startDate}
            onChange={handleValueChange}
          />
          <hr className='my-1 w-1/' />
          {/* Turnos */}
          <ul className='divide-y-2 divide-gray-100 [&>*:nth-child(odd)]:bg-slate-50 [&>*:nth-child(even)]:bg-slate-300'>
            {turnos.map((turno) => (
              <AppointmentItem
                turno={turno}
                user={user}
                key={turno._id}
              />
            ))}
          </ul>
        </div>
      )}

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
    </>
  );
};
export default AppointmentList;
