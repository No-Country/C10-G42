import React, {useState} from 'react'
import {
    AppBar,
    Toolbar,
    Container,
    Tabs,
    Tab,
    Button,
    useTheme,
    useMediaQuery,
    Typography
} from '@mui/material'

 
import Logo from "../../assets/logo.png";
import DrawerComp from './DrawerComp';
import './index.css'
const Navbar = () => {
    const theme = useTheme();

    const isMatch = useMediaQuery(theme.breakpoints.down('md'));
  
    const PAGES = [
      {
        title: "Home",
        url: "/"
      },
      {
        title: "Contacto",
        url: "/contacto"
      },
      {
        title: "Servicios",
        url: "/servicios"
      },
      {
        title: "Nosotros",
        url: "/nosotros"
      }
    ];
    
    return (
    <>
    <AppBar position="stat" sx={{background:"#3232ac"}}>
      <Toolbar>
        <div className="logo-mern">
        <img src={Logo} alt="" />
        </div>
        {isMatch ? (
  <>
    <Typography>
    </Typography>
    <DrawerComp />
  </>
) : ( 
  <> 
    <Tabs>
    {PAGES.map((page,index)=>{
  return (
    <Tab key={index}  to={page.url} sx={{color:"white"}} label={page.title} />
  );
})}
    </Tabs>
    <Button sx={{marginLeft: "auto", background:"#47c1b5"}} variant='contained'>Pedir turno</Button>
    <Button sx={{marginLeft: "10px"}} variant='contained'>Soy Medico</Button>
  </>
)}
      </Toolbar>

    </AppBar>
    
    </>
  )
}

export default Navbar