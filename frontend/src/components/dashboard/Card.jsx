const Card = ({ displayData }) => {
  const users = {
    patient: 'PACIENTE',
    doctor: 'DOCTOR',
    admin: 'ADMIN',
  };

  const roleData = (role) => {
    switch (role) {
      case 'patient':
        return users.patient;
      case 'doctor':
        return users.doctor;
      case 'admin':
        return users.admin;
    }
  };

  const imgData = (role) => {
    switch (role) {
      case 'patient':
        return (
          <img src='https://img.icons8.com/external-itim2101-lineal-color-itim2101/64/null/external-patient-coronavirus-itim2101-lineal-color-itim2101-1.png' />
        );

      case 'doctor':
        return (
          <img src='https://img.icons8.com/external-smashingstocks-flat-smashing-stocks/66/null/external-Doctors-medical-concepts-smashingstocks-flat-smashing-stocks.png' />
        );

      case 'admin':
        return (
          <img src='https://img.icons8.com/external-itim2101-lineal-color-itim2101/64/null/external-admin-network-technology-itim2101-lineal-color-itim2101-2.png' />
        );
    }
  };

  return (
    <div className='w-full bg-white rounded-lg shadow-lg lg:w-1/2 m-auto text-center'>
      <span className='flex justify-center gap-1'>
        <b>{roleData(displayData.role)}</b>
        {
          <p>
            {displayData.firstname} {displayData.lastname}
          </p>
        }
      </span>
      <hr />
      <span className='flex justify-center gap-1'>
        <b>EMAIL:</b>
        {<p>{displayData.email}</p>}
      </span>
      <span className='flex justify-center gap-1'>
        {displayData.role === 'patient' ? (
          <>
            <b>DNI:</b>
            <p>{displayData.dni}</p>
          </>
        ) : (
          displayData.role === 'doctor' && (
            <div className='md:flex md:gap-2'>
              <b>ESPECIALIDAD:</b>
              <p>{displayData.specialty}</p>
              <b>TEL/CEL:</b>
              <p>{displayData.phone}</p>
            </div>
          )
        )}
      </span>
      <span className='flex justify-center gap-1 my-5'>
        {imgData(displayData.role)}
      </span>
    </div>
  );
};
export default Card;
