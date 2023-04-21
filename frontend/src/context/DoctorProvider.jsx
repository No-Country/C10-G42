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
  const [appointmentList, setAppointmentList] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [itemsCount, setItemsCount] = useState(0);
  const [loading, setLoading] = useState(false);

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

  /**
   * @param {id} doctor
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
        `appointment/doctor/${id}?page=${_page}${dateRangeStr ?? ''}`,
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
    <DoctorContext.Provider
      value={{
        getSchedule,
        schedules,
        createSchedule,
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
    </DoctorContext.Provider>
  );
};

export { DoctorProvider };
export default DoctorContext;
