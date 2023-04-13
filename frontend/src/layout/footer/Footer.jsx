import React from 'react';
import { Container, Typography, Link } from '@mui/material';
import Logo from '../../assets/logo.png';
import './index.css';

export default function Footer() {
  return (
    <footer>
      <div className='w-full footer-container max-w-screen-xl mx-auto p-4 md:py-8'>
        <div className='sm:flex sm:items-center sm:justify-between'>
          <a
            href='#'
            className='flex items-center mb-4 sm:mb-0'>
            <div className='logo-mern'>
              <img
                src={Logo}
                alt=''
              />
            </div>

            <span className='self-center  logo-text dark:text-white'>
              Consultorio Medico
            </span>
          </a>
          <ul className='flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400'>
            <li>
              <a
                href='#'
                className='mr-4 hover:underline md:mr-6 '>
                FAQ
              </a>
            </li>
            <li>
              <a
                href='#'
                className='mr-4 hover:underline md:mr-6 '>
                Ubicación
              </a>
            </li>
            <li>
              <a
                href='#'
                className='mr-4 hover:underline md:mr-6'>
                Privacy Policy
              </a>
            </li>

            <li>
              <a
                href='#'
                className='hover:underline'>
                Contacto
              </a>
            </li>
          </ul>
        </div>
        <hr className='my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8' />
        <span className='block text-sm text-gray-500 sm:text-center dark:text-gray-400'>
          © 2023{' '}
          <a
            href='/'
            className='hover:underline'>
            MERN™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
