export const validateForm = (values) => {
  let errors = {};
  if (!values.firstname) {
    errors.firstname = 'El campo NOMBRE es obligatorio';
  } else if (values.firstname.length < 3) {
    errors.firstname = 'El campo NOMBRE debe tener mas de 3 caracteres';
  }
  if (!values.lastname) {
    errors.lastname = 'El campo APELLIDO es obligatorio';
  } else if (values.lastname.length < 3) {
    errors.name = 'El campo APELLIDO debe tener mas de 3 caracteres';
  }
  if (!values.password) {
    errors.password = 'El campo PASSWORD es obligatorio';
  } else if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      values.password,
    )
  ) {
    errors.password =
      'El campo PASSWORD debe tener minimo 8 caracteres, 1 letra minuscula, 1 letra mayuscula y 1 caracteres especial';
  }
  if (!values.passwordRepeat) {
    errors.passwordRepeat = 'El campo REPETIR PASSWORD es obligatorio';
  } else if (values.password !== values.passwordRepeat) {
    errors.passwordRepeat = 'Las contraseñas no coinciden';
  }
  if (!values.phone) {
    errors.phone = 'El campo CEL/TEL es obligatorio';
  } else if (
    !/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$/.test(
      values.phone,
    )
  ) {
    errors.phone = 'El campo CEL/TEL no tiene un formato correcto';
  }
  if (!values.gender) {
    errors.gender = 'El campo GENERO es obligatorio';
  }
  if (!values.dni) {
    errors.dni = 'El campo DNI es obligatorio';
  } else if (!/^[0-9]{8}$/.test(values.dni)) {
    errors.dni =
      'El campo DNI debe debe ser numerico y tener al menos 8 digitos';
  }
  if (!values.email) {
    errors.email = 'El campo EMAIL es obligatorio';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'El email es inválido';
  }
  return errors;
};
