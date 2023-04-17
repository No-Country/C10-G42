import useAuth from '../../../hooks/useAuth';

const HomePatient = () => {
  const {
    cerrarSesionAuth,
    auth: { user },
  } = useAuth();

  return (
    <>
      <div className='m-auto w-full'>
        <span className='w-full flex justify-center'>
          <h1 className='text-3xl text-main text-center'>
            Bienvenido{' '}
            <p className='text-3xl text-secondary w-full'>
              {user.firstname} {user.lastname} !
            </p>
          </h1>
        </span>
      </div>
    </>
  );
};
export default HomePatient;
