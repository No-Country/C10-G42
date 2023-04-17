import React, { useState } from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate, Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const PrivateRoutePatient = () => {
  const { auth, cargando } = useAuth();
  if (cargando) return 'Cargando...';
  const [opacity, setOpacity] = useState(false);
  const [sidebarOpacity, setSidebarOpacity] = useState(false);
  const handleSidbarOp = (val) => {
    setSidebarOpacity(val);
  };

  let dashboard;
  if (auth.user === undefined && !auth.user._id) {
    dashboard = <Navigate to='/login' />;
  } else if (auth.user.role !== 'patient') {
    dashboard = <Navigate to='/' />;
  } else {
    dashboard = (
      <>
        <Sidebar
          menuItems={[
            { name: 'Inicio', link: '/dashboard/paciente' },
            { name: 'Mi perfil', link: '/dashboard/paciente/perfil' },
            { name: 'Mis turnos', link: '/dashboard/paciente/turnos' },
          ]}
          setOpacity={handleSidbarOp}
        />
        <main
          className={`flex h-screen p-10 ${
            sidebarOpacity && 'pointer-events-none opacity-20'
          }`}>
          <Outlet />
        </main>
      </>
    );
  }

  return <>{dashboard}</>;
};

export default PrivateRoutePatient;
