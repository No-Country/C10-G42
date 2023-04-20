import { useState, useEffect, createContext } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import clienteAxios from '../config/clienteAxios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [cargando, setCargando] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const autenticarUsuario = async () => {
      const token = sessionStorage.getItem('token-user');
      if (!token) {
        setCargando(false);
        return;
      }

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      };

      try {
        const { data } = await clienteAxios.get('/auth/profile', config);
        setCargando(true);
        console.log('--data', data);
        setAuth(data);

        if (
          location.pathname === '/login' ||
          location.pathname === '/registro'
        ) {
          switch (data.user?.role) {
            case 'patient':
              navigate('/dashboard/paciente');
              break;
            case 'doctor':
              navigate('/dashboard/doctor');
              break;
            default:
              break;
          }
        }
      } catch (error) {
        console.error('authProv', error);
        setAuth({});
      }
      setCargando(false);
    };
    autenticarUsuario();
  }, [location.pathname]);

  const cerrarSesionAuth = () => {
    setAuth({});
    sessionStorage.removeItem('token-user');
    return <Navigate to='/login' />;
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        setCargando,
        cargando,
        cerrarSesionAuth,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
export default AuthContext;
