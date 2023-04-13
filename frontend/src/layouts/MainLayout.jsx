import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../layout/navbar/Navbar';
import Footer from '../layout/footer/Footer';

const MainLayout = () => {
  return (
    <>
      <main>
        <Navbar />
        <div>
          <Outlet />
        </div>
        <Footer />
      </main>
    </>
  );
};

export default MainLayout;
