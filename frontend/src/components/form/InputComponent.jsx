const InputComponent = ({
  type,
  name,
  label,
  placeholder,
  handleChange,
  value,
  errorField,
}) => {
  return (
    <>
      <label
        htmlFor={name}
        className='uppercase text-gray-600 block text-xl font-bold'>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className={`${
          type !== 'time' ? 'w-full' : ''
        } mt-3 p-3 border rounded-xl gb-gray-50`}
        onChange={handleChange}
        value={value}
        autoComplete={type === 'password' ? 'on' : ''}
      />
      {errorField && <div className='text-red-500'>{errorField}</div>}
    </>
  );
};

export default InputComponent;
