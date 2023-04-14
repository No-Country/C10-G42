const SubmitComponent = ({ value }) => {
  return (
    <>
      <input
        type='submit'
        value={value}
        className='bg-main hover:bg-indigo-500 w-full py-3 mb-5 text-white uppercase font-bold rounded hover:cursor-pointer transition-colors'
      />
    </>
  );
};
export default SubmitComponent;
