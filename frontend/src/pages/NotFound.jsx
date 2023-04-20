import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className='flex justify-center h-auto'>
      <div className='mt-10 my-10'>
        <h3>Pagina desconocida</h3>
        <span className='flex justify-center'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            className='w-6 h-6'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z'
            />
          </svg>
        </span>
        <span className='flex justify-center'>
          <button
            onClick={() => navigate(-1)}
            className='p-2 bg-main hover:bg-secondary text-white rounded-lg mt-5'>
            Volver
          </button>
        </span>
      </div>
    </div>
  );
};
export default NotFound;
