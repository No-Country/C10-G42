import useAuth from '../../hooks/useAuth';

const DoctorDashboard = () => {
  const { cerrarSesionAuth } = useAuth();

  return (
    <>
      <div>Doctor component</div>
      <button
        className='bg-red-500 text-white'
        onClick={cerrarSesionAuth}>
        LogOut
      </button>
    </>
  );
};
export default DoctorDashboard;
