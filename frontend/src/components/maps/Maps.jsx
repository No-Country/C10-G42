import { Typography } from '@mui/material'
import React from 'react'
import './index.css'
const Maps = () => {
  return (
    <>
    <section className="map-section" id='contact'>
        <div className="map-title">
    <Typography textAlign="center" className="pd-4" variant="h4">¿Donde ubicarnos?</Typography>
        </div>

<div className="map-container">


    <div className="map">
    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3282.7559760586964!2d-58.3669503496512!3d-34.63560646659626!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a334b6925e5473%3A0x1ca5b2748858b40d!2sEstadio%20Alberto%20J.%20Armando!5e0!3m2!1ses!2sar!4v1680697041254!5m2!1ses!2sar" width="600" height="450"  ></iframe>
    </div>
    
    <div className="map-text">
        <Typography variant='h4' align="center">¡Contáctanos!</Typography>
        <Typography variant='h6' className='text-gray-500 '>¿Tienes preguntas sobre nuestros servicios? ¿Quieres programar una cita con uno de nuestros médicos? </Typography>
      
       <Typography variant='pbody'>¡Estamos aquí para ayudarte!

Completa el formulario de contacto y uno de nuestros representantes se comunicará contigo lo antes posible. También puedes llamarnos directamente o enviarnos un correo electrónico.</Typography>
    <div className="map-info">
    <Typography variant="body1" gutterBottom>
            Dirección: Calle de la Paz, 10, 28012 Madrid
          </Typography>
          <Typography variant="body1" gutterBottom>
            Teléfono: +34 91 123 45 67
          </Typography>
          <Typography variant="body1" gutterBottom>
            Correo electrónico: info@example.com
          </Typography>
    </div>
      

    
    </div>

    </div>
    
    </section>
    
    
    
    </>
 )
}

export default Maps