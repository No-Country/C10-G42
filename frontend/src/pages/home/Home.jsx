import React from 'react';
import { Typography, Button, useMediaQuery } from '@mui/material';

import Hero from '../../assets/hero.svg';
import features1 from '../../assets/features1.svg';
import features2 from '../../assets/features2.svg';
import features3 from '../../assets/features3.svg';
import { Link } from 'react-router-dom';

const services = [
  {
    title: 'Atencion las 24 horas',
    description:
      'Nuestro equipo de expertos médicos y profesionales de la salud está dedicado a' +
      ' brindar atención integral para su bienestar físico y mental.',
    icon: features1,
  },
  {
    title: 'Cuidado especializado',
    description:
      ' Nuestro equipo de profesionales altamente capacitados se dedica a brindar el mejor servicio posible para cada uno de nuestros pacientes.',
    icon: features2,
  },
  {
    title: 'Medicos Expertos',
    description:
      ' Nuestro equipo médico altamente capacitado y experimentado se dedica a brinda' +
      'r la mejor atención médica posible para garantizar la recuperación y el bienes' +
      'tar de nuestros pacientes.',
    icon: features3,
  },
];

import './index.css';
import Doctors from '../../components/contact-form/doctors/Doctors';
import Maps from '../../components/maps/Maps';
const Home = () => {
  const matches = useMediaQuery('(max-width:600px)');
  console.log(`(min-width:600px) matches: ${matches}`);
  return (
    <>
      {' '}
      <section className='hero'>
        {' '}
        <div className='hero-title'>
          <div className='grid max-w-screen-xl lg:px-4 md:py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12'>
            <div className='mr-auto place-self-center lg:col-span-7'>
              <div className='text-sm md:text-8xl text-center'>
                <Typography
                  variant='h1'
                  component='h2'
                  gutterBottom='gutterBottom'
                  sx={{
                    ...(matches && {
                      fontSize: 'h3.fontSize',
                    }),
                  }}>
                  Tú salud es
                  <br />
                  <span className='hero-text  leading-none'>
                    Nuestra Prioridad
                  </span>
                </Typography>
              </div>
              <Typography
                className='text-white xs:text-center p-5'
                variant='h6'
                component='h6'
                gutterBottom='gutterBottom'>
                En nuestro centro médico, trabajamos para garantizar que recibas
                los mejores cuidados de salud posibles. Ofrecemos servicios
                completos y personalizados para ayudarte a mantener tu cuerpo y
                mente en las mejores condiciones.
              </Typography>
              <button
                type='button'
                className='text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'>
                <Link to='/login'>RESERVAR TURNO</Link>{' '}
              </button>
              <Button>
                {' '}
                <Link to='/services'>Saber más!</Link>
              </Button>
            </div>
            <div className='hidden col-span-5 lg:flex'>
              <img
                src={Hero}
                alt='mockup'
              />
            </div>
          </div>
        </div>
      </section>
      <section className='services'>
        <div className='py-8 px-4 mx-auto max-w-screen-xl  lg:px-6'>
          <div className='services-title'>
            <Typography
              variant='h4'
              gutterBottom='gutterBottom'
              className='text-center mb-4 text-4xl  tracking-tight font-extrabold text-gray-900 dark:text-black '
              component='h4'>
              Servicios
            </Typography>
          </div>

          <div className='services-items '>
            <div className='services-container'>
              {services.map((services, index) => {
                return (
                  <div className='services-item space-y-8 md:space-y-0 '>
                    <div>
                      <Typography
                        variant='h4'
                        key={index}
                        gutterBottom='gutterBottom'
                        className=''>
                        {services.title}
                      </Typography>
                      <Typography
                        variant='body1'
                        component='p'>
                        {services.description}
                      </Typography>
                    </div>

                    <div className='services-img'>
                      <img
                        src={services.icon}
                        alt='icono de los servicios'
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      <Doctors />
      <Maps />
    </>
  );
};

export default Home;
