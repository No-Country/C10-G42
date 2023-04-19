import React, { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import NotFound from '../pages/NotFound';

const PrivateRoutePatient = () => {
  const { auth, cerrarSesionAuth, cargando } = useAuth();
  const [sidebarOpacity, setSidebarOpacity] = useState(false);
  const navigate = useNavigate();

  if (cargando) return 'Cargando...';

  const isAuthenticated = auth.user;
  const userRole = auth.user?.role;

  if (!isAuthenticated) {
    cerrarSesionAuth();
    navigate('/login');
  }

  if (userRole !== 'patient') {
    navigate('/#');
  }

  const handleSidbarOp = (val) => {
    setSidebarOpacity(val);
  };

  if (isAuthenticated && userRole === 'patient') {
    return (
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
};

export default PrivateRoutePatient;
