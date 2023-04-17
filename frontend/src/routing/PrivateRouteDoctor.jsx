import React, { useState } from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate, Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const PrivateRouteDoctor = () => {
  const { auth, cargando } = useAuth();
  if (cargando) return 'Cargando...';
  const [sidebarOpacity, setSidebarOpacity] = useState(false);
  const handleSidbarOp = (val) => {
    setSidebarOpacity(val);
  };

  let dashboard;
  if (auth.user === undefined && !auth.user._id) {
    dashboard = <Navigate to='/login' />;
  } else if (auth.user.role !== 'doctor') {
    dashboard = <Navigate to='/' />;
  } else {
    dashboard = (
      <>
        <Sidebar
          menuItems={[
            { name: 'Inicio', link: '/dashboard/doctor' },
            { name: 'Mi perfil', link: '/dashboard/doctor/perfil' },
            { name: 'Mis turnos', link: '/dashboard/doctor/turnos' },
          ]}
          setOpacity={handleSidbarOp}
        />
        <main
          className={`flex h-screen p-10 ${
            sidebarOpacity ? 'pointer-events-none opacity-20' : ''
          }`}>
          <Outlet />
        </main>
      </>
    );
  }

  return <>{dashboard}</>;
};

export default PrivateRouteDoctor;
