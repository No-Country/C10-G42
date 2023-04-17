import { useState, useEffect } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Alerta from '../components/Alerta';
import clienteAxios from '../config/clienteAxios';
import useAuth from '../hooks/useAuth';
import SubmitComponent from '../components/form/SubmitComponent';
import useForm from '../hooks/useForm';
import InputComponent from '../components/form/InputComponent';

const validationRules = {
  password: {
    required: true,
    pattern:
      /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[A-Z])(?=.*[-\#\$\.\%\&\*])(?=.*[a-zA-Z]).{8,16}$/,
    message:
      'Debe contener al menos 8 caracteres, 1 letra minúscula, 1 letra mayúscula y 1 carácter especial',
  },
  email: {
    required: true,
    pattern: /\S+@\S+.\S+/,
    message: 'El formato es inválido',
  },
};

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alerta, setAlerta] = useState('');
  const { setCargando, cargando } = useAuth();
  const { values, handleChange, handleSubmit, errors } = useForm(
    {
      email: '',
      password: '',
    },
    validationRules,
  );

  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async ({ email, password }) => {
    setCargando(true);
    try {
      const { data } = await clienteAxios.post('auth/login', {
        email,
        password,
      });

      sessionStorage.setItem('token-user', data.token);
      setCargando(false);
      window.location.reload();
    } catch (error) {
      console.log(error);
      setCargando(false);
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
            onSubmit={handleSubmit(onSubmit)}
            className='p-5 bg-white shadow md:w-2/3 w-full'>
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
            <div className='my-5'>
              <InputComponent
                type='password'
                name='password'
                label='CONTRASEÑA'
                placeholder='contraseña'
                handleChange={handleChange}
                value={values.password}
                errorField={errors.password}
              />
            </div>

            <SubmitComponent
              value={'Iniciar Sesion'}
              loading={cargando}
            />
          </form>
        </div>

        <div className='flex justify-center'>
          <nav className='lg:flex lg:justify-between md:gap-20'>
            <Link
              className='block text-center my-5 text-slate-500 uppercase text-sm'
              to='/registro'>
              ¿No tienes cuenta? Registrate
            </Link>
            <Link
              className='block text-center my-5 text-slate-500 uppercase text-sm'
              to='/olvide-password'>
              Olvide mi password
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Login;
