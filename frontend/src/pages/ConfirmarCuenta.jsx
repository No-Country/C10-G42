import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import clienteAxios from '../config/clienteAxios';
import Alerta from '../components/Alerta';

const ConfirmarCuenta = () => {
  const [alerta, setAlerta] = useState({});
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);

  const { code } = useParams();

  useEffect(() => {
    const comprobarCuenta = async () => {
      try {
        const { data } = await clienteAxios.get(`/auth/confirm/${code}`);
        setAlerta({
          msg: data.msg,
          error: false,
        });
        setCuentaConfirmada(true);
      } catch (error) {
        setAlerta({
          msg: error.response.data,
          error: true,
        });
        setCuentaConfirmada(false);
      }
    };
    comprobarCuenta();
  }, []);

  const { msg } = alerta;

  return (
    <>
      <div className='flex justify-center m-4'>
        <h1 className='text-main font-blank text-3xl'>
          Confirma tu cuenta y Gestiona tus{' '}
          <span className='text-secondary uppercase'>turnos</span>
        </h1>
      </div>

      <div className='md:mt-5 shadow-lg px-5 py-10 bg-white'>
        {msg && <Alerta alerta={alerta} />}

        {cuentaConfirmada && (
          <Link
            className='block text-center my-5 text-slate-500 uppercase text-sm'
            to='/login'>
            Inicia Sesión
          </Link>
        )}
      </div>
    </>
  );
};

export default ConfirmarCuenta;
