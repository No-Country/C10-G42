import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoutePatient = () => {
  const { auth, cargando } = useAuth();
  if (cargando) return 'Cargando...';

  let dashboard;
  if (auth.user === undefined && !auth.user._id) {
    dashboard = <Navigate to='/login' />;
  } else if (auth.user.role !== 'patient') {
    dashboard = <Navigate to='/' />;
  } else {
    dashboard = (
      <div>
        <header className='bg-gray-100' />
        <div className='md:flex md:min-h-screen'>
          <main className='flex-1 p-10'>
            <Outlet />
          </main>
        </div>
      </div>
    );
  }

  return <>{dashboard}</>;
};

export default PrivateRoutePatient;
