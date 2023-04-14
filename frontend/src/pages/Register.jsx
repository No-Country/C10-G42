import { Link } from 'react-router-dom';
import { useState } from 'react';
import clienteAxios from '../config/clienteAxios';
import useForm from '../hooks/useForm';
import InputComponent from '../components/form/InputComponent';
import SelectComponent from '../components/form/SelectComponent';
import SubmitComponent from '../components/form/submitComponent';

const Register = () => {
  const [alerta, setAlerta] = useState({});
  const { values, handleChange, handleSubmit, updateValues, errors } = useForm({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    passwordRepeat: '',
    phone: '',
    gender: '',
    dni: '',
  });

  const onSubmit = async (data) => {
    const filterData = { ...data };
    delete filterData.passwordRepeat;
    console.log('data form', filterData);
    //enviar datos a la api
    // try {
    //   const {data} = await clienteAxios.post('/usuarios', {
    //     nombre, email, password
    //   });
    //   setAlerta({
    //     msg: data.msg,
    //     error: false
    //   })
    // } catch (error) {
    //   setAlerta({
    //     msg: error.response.data.msg,
    //     error: true
    //   });
    // }
  };

  const { msg } = alerta;

  return (
    <div className='md:flex-column md:justify-center md:items-center'>
      <h1 className='text-main font-blank md:text-6xl text-center text-4xl mt-2 w-auto'>
        Crea tu cuenta y gestiona tus{' '}
        <span className='text-secondary uppercase'>turnos</span>
      </h1>

      {msg && <Alerta alerta={alerta} />}

      <div className='md:flex md:justify-center md:items-center'>
        <form
          action=''
          className='my-10 bg-white shadow p-10 md:w-3/4'
          onSubmit={handleSubmit(onSubmit)}
          noValidate>
          <div className='my-5'>
            <InputComponent
              type='text'
              name='firstname'
              label='NOMBRE'
              placeholder='Nombre del Usuario'
              handleChange={handleChange}
              value={values.firstname}
              errorField={errors.firstname}
            />
          </div>
          <div className='my-5'>
            <InputComponent
              type='text'
              name='lastname'
              label='APELLIDO'
              placeholder='Apellido del Usuario'
              handleChange={handleChange}
              value={values.lastname}
              errorField={errors.lastname}
            />
          </div>
          <div className='my-5'>
            <InputComponent
              type='text'
              name='email'
              label='CORREO'
              placeholder='Ej: Test@email.com'
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
          <div className='my-5'>
            <InputComponent
              type='password'
              name='passwordRepeat'
              label='REPETIR CONTRASEÑA'
              placeholder='Repetir contraseña'
              handleChange={handleChange}
              value={values.passwordRepeat}
              errorField={errors.passwordRepeat}
            />
          </div>
          <div className='my-5'>
            <InputComponent
              type='text'
              name='phone'
              label='PHONE'
              placeholder='ej: (675)546464'
              handleChange={handleChange}
              value={values.phone}
              errorField={errors.phone}
            />
          </div>
          <div className='my-5'>
            <SelectComponent
              name='gender'
              label='GENERO'
              handleChange={handleChange}
              value={values.gender}
              errorField={errors.gender}
              options={[
                { value: '', text: 'Seleccionar' },
                { value: 'male', text: 'Masculino' },
                { value: 'famale', text: 'Femenino' },
                { value: 'other', text: 'Otro' },
              ]}
            />
          </div>
          <div className='my-5'>
            <InputComponent
              type='text'
              name='dni'
              label='DNI'
              placeholder='ej: 56456456'
              handleChange={handleChange}
              value={values.dni}
              errorField={errors.dni}
            />
          </div>
          <SubmitComponent value={'Registrarme'} />
          <nav className='md:flex md:justify-between'>
            <Link
              className='block text-center my-5 text-slate-500 uppercase text-sm'
              to='/login'>
              ¿Ya tienes cuenta? Inicia Sesión
            </Link>
            <Link
              className='block text-center my-5 text-slate-500 uppercase text-sm'
              to='/olvide-password'>
              Olvide mi password
            </Link>
          </nav>
        </form>
      </div>
    </div>
  );
};

export default Register;
