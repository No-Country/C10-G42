import { useEffect } from 'react';
import useAuth from '../../../hooks/useAuth';
import clienteAxios from '../../../config/clienteAxios';
import Card from '../../../components/dashboard/Card';

const ProfilePatient = () => {
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
export default ProfilePatient;
