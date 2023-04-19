import { useState, useEffect, createContext } from 'react';
import { useLocation, useNavigate, useNavigation } from 'react-router-dom';
import clienteAxios from '../config/clienteAxios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const DoctorContext = createContext();

const token = sessionStorage.getItem('token-user');
const config = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token,
  },
};
const DoctorProvider = ({ children }) => {
  const routes = {
    CREATE: '/dashboard/doctor/horarios/create',
    LIST: '/dashboard/doctor/horarios',
  };
  const [schedules, setSchedules] = useState([]);
  const navigate = useNavigate();

  const getSchedule = async (id) => {
    if (!token) {
      return;
    }

    try {
      const { data } = await clienteAxios.get(
        `/doctorschedule/doctor/${id}`,
        config,
      );
      console.log('get horarios del doctor----', data);
      setSchedules(data);
    } catch (error) {
      console.error(error.response);
      MySwal.fire({
        title: 'Error!',
        text: `${error.response.data}`,
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }
  };

  const createSchedule = async (body) => {
    if (!token) {
      return;
    }

    try {
      const { data } = await clienteAxios.post(`/doctorschedule`, body, config);
      console.log('post horarios del doctor----', data);
      MySwal.fire({
        title: 'Horario creado!',
        text: `${data.msg}`,
        icon: 'success',
        confirmButtonText: 'OK',
      }).then((res) => {
        if (res) return navigate(routes.LIST);
      });
    } catch (error) {
      console.error(error.response);
      MySwal.fire({
        title: 'Error!',
        text: `${error.response.data}`,
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }
  };

  return (
    <DoctorContext.Provider
      value={{
        getSchedule,
        schedules,
        createSchedule,
        routes,
      }}>
      {children}
    </DoctorContext.Provider>
  );
};

export { DoctorProvider };
export default DoctorContext;
