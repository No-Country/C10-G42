import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import clienteAxios from '../config/clienteAxios';
import Alerta from '../components/Alerta';
import SubmitComponent from '../components/form/SubmitComponent';
import InputComponent from '../components/form/InputComponent';
import useForm from '../hooks/useForm';

const validationRules = {
  password: {
    required: true,
    pattern:
      /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[A-Z])(?=.*[-\#\$\.\%\&\*])(?=.*[a-zA-Z]).{8,16}$/,
    message:
      'Debe contener al menos 8 caracteres, 1 letra minúscula, 1 letra mayúscula y 1 carácter especial',
  },
};

const NuevoPassword = () => {
  const params = useParams();
  const { code } = params;
  const [alerta, setAlerta] = useState({});
  const [tokenValido, setTokenValido] = useState(false);
  const [passwordUpdate, setPasswordUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  const { values, handleChange, handleSubmit, errors } = useForm(
    {
      password: '',
    },
    validationRules,
  );

  useEffect(() => {
    const comprobarToken = async () => {
      setLoading(true);
      try {
        const { data } = await clienteAxios.get(
          `/auth/forgot-password/${code}`,
        );
        setTokenValido(true);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setAlerta({
          msg: error.response.data,
          error: true,
        });
      }
    };
    comprobarToken();
  }, []);

  const { msg } = alerta;

  const onSubmit = async ({ password }) => {
    try {
      const { data } = await clienteAxios.post(`/auth/reset-password/${code}`, {
        password,
      });
      setAlerta({
        msg: data.msg,
        error: false,
      });
      setPasswordUpdate(true);
      setTokenValido(false);
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const msgLoading = loading && (
    <p className='text-center my-2'>Comprobando token...</p>
  );

  return (
    <div className='md:my-20'>
      <div className='flex justify-center mt-10'>
        <h1 className='text-main font-blank text-3xl text-center'>
          Restablece tu contraseña y Gestiona tus {''}
          <span className='text-secondary uppercase'>turnos</span>
        </h1>
      </div>
      {msgLoading}
      <div className='flex justify-center'>
        {msg && <Alerta alerta={alerta} />}
      </div>
      <div className='bg-white md:flex md:justify-center'>
        {tokenValido && (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='md:my-10 bg-white shadow p-10 md:w-3/4'>
            <div className='my-5'>
              <InputComponent
                type='password'
                name='password'
                label='CONTRASEÑA'
                placeholder='Nueva contraseña'
                handleChange={handleChange}
                value={values.password}
                errorField={errors.password}
              />
            </div>
            <SubmitComponent value={'Confirmar nueva Contraseña'} />
          </form>
        )}
      </div>
      {passwordUpdate && (
        <Link
          className='block text-center my-5 text-slate-500 hover:text-main uppercase text-3xl'
          to='/'>
          Iniciar Sesión
        </Link>
      )}
    </div>
  );
};

export default NuevoPassword;
