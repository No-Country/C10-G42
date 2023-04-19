import { Link } from 'react-router-dom';
const HomeDashboard = ({ user }) => {
  return (
    <div className='m-auto w-full'>
      <span className='w-full flex-col items-center'>
        <h1 className='text-3xl text-main text-center'>
          Bienvenido {user.role === 'doctor' && 'Doc'}{' '}
          <p className='text-3xl text-secondary w-full'>
            {user.firstname} {user.lastname} !
          </p>
        </h1>
        <span className='flex justify-center mt-3'>
          <button className='font-bold bg-main text-white text-sm flex justify-center text-center gap-1 p-2 rounded-lg'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25'
              />
            </svg>

            <Link to='/'>Pagina principal</Link>
          </button>
        </span>
      </span>
    </div>
  );
};
export default HomeDashboard;
