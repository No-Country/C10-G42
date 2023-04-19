import useAuth from '../../../hooks/useAuth';
import HomeDashboard from '../../../components/dashboard/HomeDashboard';

const HomePatient = () => {
  const {
    cerrarSesionAuth,
    auth: { user },
  } = useAuth();

  return (
    <>
      <HomeDashboard user={user} />
    </>
  );
};
export default HomePatient;
