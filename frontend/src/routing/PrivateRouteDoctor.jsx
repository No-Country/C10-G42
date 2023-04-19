import React, { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate, Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const PrivateRouteDoctor = () => {
  const { auth, cerrarSesionAuth } = useAuth();
  const [sidebarOpacity, setSidebarOpacity] = useState(false);
  //const [dash, setDash] = useState(null); // agregamos setDashboard
  let dashboard;
  const handleSidbarOp = (val) => {
    setSidebarOpacity(val);
  };
  //useEffect(() => {
  if (auth.user === undefined && !auth.user?.userId) {
    // setDash();
    dashboard = <Navigate to='/login' />;
    cerrarSesionAuth();
  } else if (auth.user.role !== 'doctor') {
    // setDash();
    dashboard = <Navigate to='/' />;
  } else {
    // setDash();
    dashboard = (
      <>
        <Sidebar
          menuItems={[
            { name: 'Inicio', link: '/dashboard/doctor' },
            { name: 'Mi perfil', link: '/dashboard/doctor/perfil' },
            { name: 'Mis turnos', link: '/dashboard/doctor/turnos' },
            { name: 'Mis horarios', link: '/dashboard/doctor/horarios' },
          ]}
          setOpacity={handleSidbarOp}
        />
        <main
          className={`flex justify-center h-screen p-6 ${
            sidebarOpacity ? 'pointer-events-none opacity-20' : ''
          }`}>
          <Outlet />
        </main>
      </>
    );
  }
  // }, []);

  return <>{dashboard}</>;
};

export default PrivateRouteDoctor;
