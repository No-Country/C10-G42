import Loading from '../Loading';

const SubmitComponent = ({ value, loading = false }) => {
  return (
    <>
      <button
        type='submit'
        className='bg-main hover:bg-indigo-500 w-full py-3 mb-5 text-white uppercase font-bold rounded hover:cursor-pointer transition-colors'
        value={value}>
        {loading ? <Loading /> : value}
      </button>
    </>
  );
};
export default SubmitComponent;
