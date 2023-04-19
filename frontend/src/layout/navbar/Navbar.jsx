import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  useTheme,
  useMediaQuery,
  Typography,
  Menu,
  MenuItem,
} from '@mui/material';
import { Link } from 'react-router-dom';

import Logo from '../../assets/logo.png';
import DrawerComp from './DrawerComp';
import './index.css';
import useAuth from '../../hooks/useAuth';
import Avatar from 'react-avatar';
const Navbar = () => {
  const theme = useTheme();

  const isMatch = useMediaQuery(theme.breakpoints.down('md'));
  const {
    auth: { user },
    cerrarSesionAuth,
  } = useAuth();
  const dashboardUser = (rol) => {
    switch (rol) {
      case 'patient':
        return '/dashboard/paciente';
      case 'doctor':
        return '/dashboard/doctor';
      case 'admin':
        return '/dashboard/admin';
    }
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    isMatch && handleClose();
  }, [isMatch]);

  const PAGES = [
    {
      title: 'Home',
      url: '/',
    },
    // {
    //   title: 'Contacto',
    //   url: '/contact',
    // },
    {
      title: 'Servicios',
      url: '/services',
    },
    {
      title: 'Nosotros',
      url: '/nosotros',
    },
  ];

  return (
    <>
      <AppBar
        position='stat'
        sx={{ background: '#3232ac' }}>
        <Toolbar>
          <div className='logo-mern'>
            <Link to='/'>
              <img
                src={Logo}
                alt=''
              />
            </Link>
          </div>
          {isMatch ? (
            <>
              {/* hop */}
              <Typography></Typography>
              <DrawerComp
                user={user}
                cerrarSesionAuth={cerrarSesionAuth}
              />
            </>
          ) : (
            <>
              <div className='links-container'>
                {PAGES.map((page, index) => (
                  <Link
                    key={index}
                    to={page.url}
                    className='text-white '>
                    {page.title}
                  </Link>
                ))}
              </div>
              {!user ? (
                <>
                  <Button
                    sx={{ marginLeft: 'auto', background: '#47c1b5' }}
                    variant='contained'>
                    <Link to='/login'>Pedir turno</Link>{' '}
                  </Button>
                  <Button
                    sx={{ marginLeft: '10px' }}
                    variant='contained'>
                    <Link to='/login'>Soy Medico</Link>
                  </Button>
                </>
              ) : (
                <div className='text-white ml-96'>
                  <div>
                    <Button
                      id='basic-button'
                      aria-controls={open ? 'basic-menu' : undefined}
                      aria-haspopup='true'
                      aria-expanded={open ? 'true' : undefined}
                      onClick={handleClick}
                      sx={{ color: 'white' }}>
                      <Avatar
                        name={`${user.firstname} ${user.lastname}`}
                        round={true}
                        size='50'
                        color='#47c1b5'
                      />
                    </Button>

                    <Menu
                      id='basic-menu'
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        'aria-labelledby': 'basic-button',
                      }}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                      }}>
                      <div className='p-2 flex-col items-center leading-7'>
                        <p className='flex justify-center gap-2'>
                          {user?.firstname}
                          {user?.lastname}
                        </p>
                        <p>{user?.email}</p>
                      </div>
                      <span className='flex justify-center'>
                        <MenuItem onClick={handleClose}>
                          <Link
                            className='font-bold text-main'
                            to={dashboardUser(user?.role)}>
                            Dashboard
                          </Link>
                        </MenuItem>
                      </span>
                      <span className='flex justify-center'>
                        <MenuItem onClick={cerrarSesionAuth}>Logout</MenuItem>
                      </span>
                    </Menu>
                  </div>
                </div>
              )}
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
