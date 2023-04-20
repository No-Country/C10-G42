import { useContext } from 'react';
import DoctorContext from '../context/DoctorProvider';

const useDoctor = () => {
  return useContext(DoctorContext);
};

export default useDoctor;
