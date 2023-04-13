import { useState, useEffect } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Alerta from '../components/Alerta';
import clienteAxios from '../config/clienteAxios';
import useAuth from '../hooks/useAuth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alerta, setAlerta] = useState('');

  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([email, password].includes('')) {
      setAlerta({
        msg: 'Los campos son obligatorios.',
        error: true,
      });
    }
    try {
      const { data } = await clienteAxios.post('auth/login', {
        email,
        password,
      });

      sessionStorage.setItem('token-user', data.token);
      //setAuth(data);

      //Ssi esta logueado y tiene rol, redigir a la ruta correspondiente
      console.log('check token');
      // sessionStorage.getItem('token-user').length &&
      //   navigate('/dashboard/paciente');

      window.location.reload();
    } catch (error) {
      console.log(error);
      setAlerta({
        msg: error.response.data,
        error: true,
      });
    }
  };

  const { msg } = alerta;
  const handleAlert = () => {
    setAlerta('');
  };

  return (
    <>
      <div className='flex-col justify-center'>
        <h1 className='text-main font-blank text-5xl p-5 text-center'>
          Iniciar sesion
        </h1>

        {msg && (
          <Alerta
            alerta={alerta}
            onClick={handleAlert}
          />
        )}
        <div className='flex items-center justify-center'>
          <form
            onSubmit={handleSubmit}
            className='p-5 bg-white shadow w-screen md:w-2/3'>
            <div className='my-5'>
              <label
                htmlFor='email'
                className='uppercase text-gray-600 block text-xl font-bold'>
                Email:
              </label>
              <input
                id='email'
                type='email'
                placeholder='Ej: user@email.com'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='w-full mt-3 p-3 border rounded-xl gb-gray-50'
              />
            </div>
            <div className='my-5'>
              <label
                htmlFor='password'
                className='uppercase text-gray-600 block text-xl font-bold'>
                Contraseña:
              </label>
              <input
                id='password'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='w-full mt-3 p-3 border rounded-xl gb-gray-50'
                autoComplete='on'
              />
            </div>

            <input
              type='submit'
              value='Iniciar Sesion'
              className='bg-main w-full py-3 mb-5 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors'
            />
          </form>
        </div>

        <nav className='lg:flex lg:justify-center justify-center'>
          <Link
            className='block text-center my-5 text-slate-500 uppercase text-sm'
            to='/registrar'>
            ¿No tienes cuenta? Registrate
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Login;