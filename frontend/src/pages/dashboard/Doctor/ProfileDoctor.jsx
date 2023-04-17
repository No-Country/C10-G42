import Card from '../../../components/dashboard/Card';
import useAuth from '../../../hooks/useAuth';

const ProfileDoctor = () => {
  const {
    auth: { user },
  } = useAuth();

  const { patientID, confirmed, userId, ...displayData } = user;

  return (
    <>
      <div className='m-auto w-full'>
        <div className='flex justify-center'>
          <Card displayData={displayData} />
        </div>
      </div>
    </>
  );
};
export default ProfileDoctor;
