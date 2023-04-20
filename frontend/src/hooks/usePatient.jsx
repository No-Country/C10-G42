import { useContext } from 'react';
import PatientContext from '../context/PatientProvider';

const usePatient = () => {
  return useContext(PatientContext);
};

export default usePatient;
