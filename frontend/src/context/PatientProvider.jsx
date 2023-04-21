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
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  /**
   * @param {id} patient
   * @param {dateRange}
   * @returns
   */
  const getAppointment = async (
    id,
    _page = page,
    dateRange = {
      startDate: '',
      endDate: '',
    },
  ) => {
    if (!token) {
      return;
    }

    const dateRangeStr = dateRange.startDate
      ? `&fechaInicio=${dateRange.startDate}&fechaFin=${dateRange.endDate}`
      : '';

    setLoading(true);

    try {
      const { data } = await clienteAxios.get(
        `appointment/patient/${id}?page=${_page}${dateRangeStr ?? ''}`,
        config,
      );
      data?.msg &&
        MySwal.fire({
          title: 'Error!',
          text: `${data.msg}`,
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      setAppointmentList(data);
      setLoading(false);
      setItemsCount(data?.pagination.itemsCount);
      setPages(data?.pagination.pagesCount);
    } catch (error) {
      setLoading(false);
      console.log('this', error);
      MySwal.fire({
        title: 'Error!',
        text: `${error.response.data}`,
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }
  };

  return (
    <PatientContext.Provider
      value={{
        routes,
        getAppointment,
        appointmentList,
        setAppointmentList,
        pages,
        page,
        setPage,
        itemsCount,
        loading,
      }}>
      {children}
    </PatientContext.Provider>
  );
};

export { PatientProvider };
export default PatientContext;
