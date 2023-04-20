import { useState, useEffect, createContext } from 'react';
import { useLocation, useNavigate, useNavigation } from 'react-router-dom';
import clienteAxios from '../config/clienteAxios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const PatientContext = createContext();

const token = sessionStorage.getItem('token-user');
const config = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token,
  },
};
const PatientProvider = ({ children }) => {
  const routes = {
    APPOINTMENT_LIST: '/dashboard/paciente/turnos',
  };
  const [appointmentList, setAppointmentList] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [itemsCount, setItemsCount] = useState(0);
  const navigate = useNavigate();

  /**
   * @param {*} id - User patient
   * @returns
   */

  //   useEffect(() => {
  // 	getAppointment()
  //   }, [page])

  const getAppointment = async (id, _page = page) => {
    if (!token) {
      return;
    }

    try {
      const { data } = await clienteAxios.get(
        `appointment/patient/${id}?page=${_page}`,
        config,
        // {
        //   params: {
        //     page: 2,
        //     fechaInicio: '',
        //     fechaFin: '',
        //   },
        // },
      );
      setAppointmentList(data);
      setItemsCount(data?.pagination.itemsCount);
      setPages(data?.pagination.pagesCount);
      _page && setPage(_page);
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

  //     if (!token) {
  //       return;
  //     }

  //     try {
  //       const { data } = await clienteAxios.post(`/doctorschedule`, body, config);
  //       console.log('post horarios del doctor----', data);
  //       MySwal.fire({
  //         title: 'Horario creado!',
  //         text: `${data.msg}`,
  //         icon: 'success',
  //         confirmButtonText: 'OK',
  //       }).then((res) => {
  //         if (res) return navigate(routes.LIST);
  //       });
  //     } catch (error) {
  //       console.error(error.response);
  //       MySwal.fire({
  //         title: 'Error!',
  //         text: `${error.response.data}`,
  //         icon: 'error',
  //         confirmButtonText: 'Ok',
  //       });
  //     }
  //   };

  return (
    <PatientContext.Provider
      value={{
        appointmentList,
        routes,
        getAppointment,
        setAppointmentList,
        pages,
        page,
        setPage,
        itemsCount,
      }}>
      {children}
    </PatientContext.Provider>
  );
};

export { PatientProvider };
export default PatientContext;
