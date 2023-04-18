import HomeDashboard from '../../../components/dashboard/HomeDashboard';
import useAuth from '../../../hooks/useAuth';

const HomeDoctor = () => {
  const {
    auth: { user },
  } = useAuth();

  return (
    <>
      <HomeDashboard user={user} />
    </>
  );
};
export default HomeDoctor;
