import React, {useState} from 'react'
import {
    AppBar,
    Toolbar,
    Button,
    useTheme,
    useMediaQuery,
    Typography
} from '@mui/material'
import {Link} from "react-router-dom"
 
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
        url: "/contact"
      },
      {
        title: "Servicios",
        url: "/services"
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
          <Link to='/'>
          
        <img src={Logo} alt="" />
          </Link>
        </div>
        {isMatch ? (
  <> 
  {/* hop */}
    <Typography>
    </Typography>
    <DrawerComp />
  </>
) : ( 
  <> 
  <div className="links-container">
{PAGES.map((page, index) => (
  <Link key={index} to={page.url} className="text-white ">{page.title}</Link>
))}
  </div>
    <Button sx={{marginLeft: "auto", background:"#47c1b5"}} variant='contained' ><Link to='/login'>Pedir turno</Link> </Button>
    <Button sx={{marginLeft: "10px"}} variant='contained'><Link to='/login'>Soy Medico</Link></Button>
  </>
)}
      </Toolbar>

    </AppBar>
    
    </>
  )
}

export default Navbar