const SelectComponent = ({
  name,
  label,
  handleChange,
  value,
  errorField,
  options,
}) => {
  return (
    <>
      <div className='relative inline-flex'>
        <label
          htmlFor={name}
          className='uppercase text-gray-600 block text-xl font-bold'>
          {label}
        </label>
        &nbsp;&nbsp;
        <select
          id={name}
          name={name}
          className='appearance-none border border-gray-400 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
          onChange={handleChange}
          value={value}>
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              hidden={!option.value && true}>
              {option.text}
            </option>
          ))}
        </select>
        <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
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
              d='M19.5 8.25l-7.5 7.5-7.5-7.5'
            />
          </svg>
        </div>
      </div>
      {errorField && (
        <div className='text-red-500'>&nbsp;&nbsp;{errorField}</div>
      )}
    </>
  );
};

export default SelectComponent;
