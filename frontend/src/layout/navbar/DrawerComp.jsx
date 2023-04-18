import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import {
  Drawer,
  List,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Logout from '../../components/Logout';

const DrawerComp = ({ user, cerrarSesionAuth }) => {
  const [openDrawer, setOpenDrawer] = useState(false);

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

  const PAGES = [
    {
      title: 'Home',
      url: '/',
    },
    {
      title: 'Contacto',
      url: '/contacto',
    },
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
    <React.Fragment>
      <Drawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        PaperProps={{
          sx: { width: '70%' },
        }}>
        <List style={{ width: window.innerWidth * 0.25 }}>
          {PAGES.map((page, index) => {
            return (
              <>
                <ListItemButton
                  onClick={() => setOpenDrawer(false)}
                  key={index}>
                  <ListItemIcon>
                    <ListItemText>
                      <Link to={page.url}>{page.title}</Link>
                    </ListItemText>
                  </ListItemIcon>
                </ListItemButton>
              </>
            );
          })}
        </List>
        {user?.firstname && (
          <>
            <hr />
            <div className='flex justify-center mt-1 text-center'>
              <div className='flex-col items-center leading-7'>
                <span className='my-5'>
                  <p>
                    {user?.firstname} {user?.lastname}
                  </p>
                  <p>{user?.email}</p>
                  <Link
                    className='font-bold text-main'
                    to={dashboardUser(user?.role)}>
                    Dashboard
                  </Link>
                </span>
                <hr />
                <br />
                <Logout
                  cerrarSesionAuth={cerrarSesionAuth}
                  padding={2}
                />
              </div>
            </div>
          </>
        )}
      </Drawer>
      <IconButton
        sx={{ color: 'white', marginLeft: 'auto' }}
        onClick={() => setOpenDrawer(!openDrawer)}>
        <MenuIcon />
      </IconButton>
    </React.Fragment>
  );
};

export default DrawerComp;
