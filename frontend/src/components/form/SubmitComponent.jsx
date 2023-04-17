const SubmitComponent = ({ value, loading = false }) => {
  const loadingAnimate = (
    <div
      className='inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]'
      role='status'>
      <span className='!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]'>
        Loading...
      </span>
    </div>
  );

  return (
    <>
      <button
        type='submit'
        className='bg-main hover:bg-indigo-500 w-full py-3 mb-5 text-white uppercase font-bold rounded hover:cursor-pointer transition-colors'
        value={value}>
        {loading ? loadingAnimate : value}
      </button>
    </>
  );
};
export default SubmitComponent;
