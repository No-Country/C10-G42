const PatientAppointmentItem = ({ turno }) => {
  return (
    <li
      className='p-3 cursor-text'
      key={turno._id}>
      <div className='md:flex md:justify-between'>
        <p>
          <b>Fecha: </b>
          {new Date(turno.date).toLocaleDateString('es-AR', {
            timeZone: 'UTC',
          })}
        </p>
        <p>
          <b>Hora inicio: </b> {turno.startTime}
        </p>

        <div>
          <p>
            <b>Doctor: </b> {turno.doctor.name}
          </p>
          <p>
            <b>Especialidad: </b> {turno.doctor.specialty}
          </p>
        </div>
      </div>
    </li>
  );
};

const DoctorAppointmentItem = ({ turno }) => {
  return (
    <li className='p-3 cursor-text'>
      <div className='md:flex md:justify-between'>
        <p>
          <b>Fecha: </b>
          {new Date(turno.date).toLocaleDateString('es-AR', {
            timeZone: 'UTC',
          })}
        </p>
        <p>
          <b>Hora inicio: </b> {turno.startTime}
        </p>

        <div>
          <p>
            <b>Paciente: </b>
            {turno.patient.username}
          </p>
        </div>
      </div>
    </li>
  );
};

const AppointmentItem = ({ turno, user }) => {
  const isPatient = user.role === 'patient';
  return isPatient ? (
    <PatientAppointmentItem turno={turno} />
  ) : (
    <DoctorAppointmentItem turno={turno} />
  );
};

export default AppointmentItem;
