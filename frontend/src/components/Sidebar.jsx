import { useState } from 'react';
import useAuth from '../hooks/useAuth';
import Avatar from 'react-avatar';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Logout from './Logout';

const Sidebar = ({ menuItems, setOpacity }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const location = useLocation();
  const {
    auth: { user },
    cerrarSesionAuth,
  } = useAuth();

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
    setOpacity(!showSidebar);
  };

  return (
    <>
      {showSidebar ? (
        <button
          className='flex text-4xl text-white items-center cursor-pointer fixed right-10 top-6 z-50'
          onClick={toggleSidebar}>
          x
        </button>
      ) : (
        <svg
          onClick={toggleSidebar}
          className='fixed z-30 flex items-center cursor-pointer right-10 top-6'
          fill='#2563EB'
          viewBox='0 0 100 80'
          width='40'
          height='40'>
          <rect
            width='100'
            height='10'></rect>
          <rect
            y='30'
            width='100'
            height='10'></rect>
          <rect
            y='60'
            width='100'
            height='10'></rect>
        </svg>
      )}

      <header className='text-center'>
        <div
          className={`top-0 right-0 bg-main p-20 text-white fixed h-full z-40  ease-in-out duration-300 ${
            showSidebar ? 'translate-x-0 ' : 'translate-x-full'
          } w-full md:w-auto`}>
          <div className='mt-2 text-4xl font-semibold text-white h-full'>
            <Avatar
              name={`${user.firstname} ${user.lastname}`}
              round={true}
              size='100'
              color='#47c1b5'
            />
            <hr className='border-b border-secondary my-2' />
            {/* Menu items */}
            <nav className='mt-1'>
              <ul className='space-y-1 m-0 flex-col items-center w-full'>
                {menuItems.map((item) => (
                  <li
                    className={`px-4 py-2 ${
                      location.pathname === item.link
                        ? 'bg-secondary text-white'
                        : 'hover:bg-secondary hover:text-white'
                    }`}
                    key={item.link}>
                    <Link to={item.link}>{item.name}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <Logout
            cerrarSesionAuth={cerrarSesionAuth}
            padding={5}
          />
        </div>
      </header>
    </>
  );
};

export default Sidebar;
