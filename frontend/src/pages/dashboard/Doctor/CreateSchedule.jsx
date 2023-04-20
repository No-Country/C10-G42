import { useState } from 'react';
import useForm from '../../../hooks/useForm';
import InputComponent from '../../../components/form/InputComponent';
import SubmitComponent from '../../../components/form/SubmitComponent';
import SelectComponent from '../../../components/form/SelectComponent';
import clienteAxios from '../../../config/clienteAxios';
import useDoctor from '../../../hooks/useDoctor';
import { Link, useOutletContext } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

const validationRules = {
  day: {
    required: true,
    todayAndAfter: true,
  },
  startTime: {
    required: true,
  },
  endTime: {
    required: true,
  },
  interval: {
    required: true,
  },
};

const CreateSchedule = () => {
  const { values, handleChange, handleSubmit, errors } = useForm(
    {
      day: '',
      startTime: '',
      endTime: '',
      interval: '',
    },
    validationRules,
  );
  const { createSchedule, routes } = useDoctor();
  const {
    auth: { user },
  } = useAuth();

  const onSubmit = async (data) => {
    const body = { ...data, ...{ doctor: user.doctorID } };
    const resp = await createSchedule(body);
  };

  return (
    <div className='md:flex-column md:items-center w-full md:w-1/2 mt-10 bg-white'>
      <div className='md:flex md:justify-between mt-5 p-10'>
        <h3 className='text-main font-blank md:text-2xl text-center text-4xl mt-2 w-auto'>
          Crear Horario
        </h3>
        <span className='max-sm:flex max-sm:justify-center flex'>
          <Link
            className='p-3 rounded-md bg-main hover:bg-secondary text-white'
            to={routes.LIST}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3'
              />
            </svg>
          </Link>
        </span>
      </div>
      <div className='md:flex md:justify-center w-full'>
        <form
          action=''
          className='border shadow p-5 flex-col items-end'
          onSubmit={handleSubmit(onSubmit)}
          noValidate>
          <div className='my-5'>
            <InputComponent
              type='date'
              name='day'
              label='DIA'
              placeholder=''
              handleChange={handleChange}
              value={values.day}
              errorField={errors.day}
            />
          </div>
          <div className='my-5 md:flex md:justify-between md:gap-2 md:items-center'>
            <InputComponent
              type='time'
              name='startTime'
              label='HORA INICIO'
              placeholder=''
              handleChange={handleChange}
              value={values.startTime}
              errorField={errors.startTime}
            />

            <InputComponent
              type='time'
              name='endTime'
              label='HORA FIN'
              placeholder=''
              handleChange={handleChange}
              value={values.endTime}
              errorField={errors.endTime}
            />
          </div>
          <div className='my-5'>
            <SelectComponent
              name='interval'
              label='INTERVALO'
              handleChange={handleChange}
              value={values.interval}
              errorField={errors.interval}
              options={[
                { text: 'Seleccionar', value: '' },
                { text: '15Min', value: 15 },
                { text: '30Min', value: 30 },
                { text: '60Min', value: 60 },
              ]}
            />
          </div>
          <SubmitComponent value={'CREAR'} />
          <nav className='md:flex md:justify-between'></nav>
        </form>
      </div>
    </div>
  );
};
export default CreateSchedule;
