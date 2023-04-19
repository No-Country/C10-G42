import React,{useState} from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import { Drawer,List,IconButton, ListItem,ListItemButton, ListItemIcon,ListItemText } from '@mui/material'
import { Link } from 'react-router-dom';

const DrawerComp = () => {

    const [openDrawer,setOpenDrawer]=useState(false)

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
<React.Fragment>
<Drawer open={openDrawer} onClose={()=>setOpenDrawer(false)}>
<List>
    {PAGES.map((page,index)=>{
        return(
    <ListItemButton onClick={()=>   setOpenDrawer(false)} key={index}>
    <ListItemIcon>
        <ListItemText><Link to={page.url} >{page.title}</Link></ListItemText>
    </ListItemIcon>
</ListItemButton>)
    })
    }

</List>
</Drawer>
<IconButton sx={{color:"white",marginLeft:"auto"}} onClick={()=> setOpenDrawer(!openDrawer)}>
<MenuIcon/>
</IconButton>
</React.Fragment>
  )
}

export default DrawerComp