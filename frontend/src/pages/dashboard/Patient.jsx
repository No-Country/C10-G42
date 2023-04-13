import useAuth from '../../hooks/useAuth';

const Patient = () => {
  const { cerrarSesionAuth } = useAuth();

  return (
    <>
      <div>Patient component</div>
      <button
        className='bg-red-500 text-white'
        onClick={cerrarSesionAuth}>
        LogOut
      </button>
    </>
  );
};
export default Patient;
