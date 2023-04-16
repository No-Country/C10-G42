import { useState } from 'react';
import { Link } from 'react-router-dom';
import Alerta from '../components/Alerta';
import clienteAxios from '../config/clienteAxios';
import SubmitComponent from '../components/form/SubmitComponent';
import InputComponent from '../components/form/InputComponent';
import useForm from '../hooks/useForm';

const validationRules = {
  email: {
    required: true,
    pattern: /\S+@\S+.\S+/,
    message: 'El formato es inválido',
  },
};

const OlvidePassword = () => {
  const { values, handleChange, handleSubmit, errors } = useForm(
    {
      email: '',
    },
    validationRules,
  );
  const [alerta, setAlerta] = useState({});

  const onSubmit = async ({ email }) => {
    try {
      const { data } = await clienteAxios.post(`/auth/forgot-password`, {
        email,
      });
      setAlerta({
        msg: data.msg,
        error: false,
      });
    } catch (error) {
      setAlerta({
        msg: error.response.data,
        error: true,
      });
    }
  };

  const { msg } = alerta;

  return (
    <>
      <div className='flex justify-center mt-4'>
        <h1 className='text-main font-blank text-3xl text-center'>
          Recupera tu cuenta y administra tus{' '}
          <span className='text-secondary uppercase'>turnos</span>
        </h1>
      </div>
      {msg && <Alerta alerta={alerta} />}
      <div className='md:flex md:justify-center'>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='my-2 bg-white shadow p-10  md:w-1/2'>
          <div className='my-5'>
            <InputComponent
              type='text'
              name='email'
              label='CORREO'
              placeholder='Ej: user@email.com'
              handleChange={handleChange}
              value={values.email}
              errorField={errors.email}
            />
          </div>
          <SubmitComponent value={'Recuperar Contraseña'} />
        </form>
      </div>

      <div className='flex justify-center my-4'>
        <nav className='flex justify-between items-center md:gap-20'>
          <Link
            className='block text-center text-slate-500 uppercase text-sm'
            to='/login'>
            ¿Ya tienes cuenta? Inicia Sesión
          </Link>
          <Link
            className='block text-center text-slate-500 uppercase text-sm'
            to='/registro'>
            ¿No tienes cuenta? Registrate
          </Link>
        </nav>
      </div>
    </>
  );
};

export default OlvidePassword;
