import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import clienteAxios from '../config/clienteAxios';
import Alerta from '../components/Alerta';
import SubmitComponent from '../components/form/SubmitComponent';

const NuevoPassword = () => {
  const params = useParams();
  const { code } = params;
  const [alerta, setAlerta] = useState({});
  const [tokenValido, setTokenValido] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordUpdate, setPasswordUpdate] = useState(false);

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        const { data } = await clienteAxios.get(
          `/auth/forgot-password/${code}`,
        );
        setTokenValido(true);
      } catch (error) {
        setAlerta({
          msg: error.response.data,
          error: true,
        });
      }
    };
    comprobarToken();
  }, []);

  const { msg } = alerta;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      setAlerta({
        msg: 'La contraseña debe tener minimo: 8 carácteres',
        error: true,
      });
      return;
    }
    try {
      const { data } = await clienteAxios.post(
        `/auth/forgot-password/${code}`,
        { password },
      );
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

  return (
    <div className='md:my-20'>
      <div className='flex justify-center mt-10'>
        <h1 className='text-main font-blank text-3xl text-center'>
          Restablece tu contraseña y Gestiona tus {''}
          <span className='text-secondary uppercase'>turnos</span>
        </h1>
      </div>
      <div className='flex justify-center'>
        {msg && <Alerta alerta={alerta} />}
      </div>
      <div className='bg-white md:flex md:justify-center'>
        {tokenValido && (
          <form
            onSubmit={handleSubmit}
            className='md:my-10 bg-white shadow p-10 md:w-3/4'>
            <div className='my-5'>
              <label
                htmlFor='password'
                className='uppercase text-gray-600 block text-xl font-bold'>
                Password:
              </label>
              <input
                id='password'
                type='password'
                placeholder='Nueva contraseña'
                className='w-full mt-3 p-3 border rounded-xl gb-gray-50'
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
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
