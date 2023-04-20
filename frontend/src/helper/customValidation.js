export const validateForm = (formFields, validationRules) => {
  let errors = {};
  for (let field of Object.keys(formFields)) {
    if (Object.keys(validationRules).includes(field)) {
      const rules = validationRules[field];
      if (rules.required && !formFields[field]) {
        errors[field] = 'Este campo es requerido';
      } else if (
        rules.minLength &&
        formFields[field].length < rules.minLength
      ) {
        errors[field] = `Debe tener al menos ${rules.minLength} caracteres`;
      } else if (rules.pattern && !rules.pattern.test(formFields[field])) {
        errors[field] = rules.message || 'El campo es inválido';
      } else if (rules.match && formFields[field] !== formFields[rules.match]) {
        errors[field] = rules.message || 'Los campos deben coincidir';
      } else if (
        rules.todayAndAfter &&
        formFields[field] < new Date().toISOString().split('T')[0]
      ) {
        errors[field] = 'La fecha no puede ser menor a la actual';
      }
    }
  }
  return errors;
};
