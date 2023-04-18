import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../layout/navbar/Navbar';
import Footer from '../layout/footer/Footer';

const MainLayout = () => {
  return (
    <div className='overflow-hidden'>
      <div className='flex flex-col min-h-screen'>
        <div className='flex-shrink-0'>
          <Navbar />
        </div>

        <main className='flex-grow'>
          <Outlet />
        </main>

        <div className='flex-shrink-0'>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
