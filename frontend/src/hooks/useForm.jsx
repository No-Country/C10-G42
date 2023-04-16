import { useCallback, useState } from 'react';
import { validateForm } from '../helper/customValidation';

export default function useForm(defaultValues, validationRules) {
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (onSubmit) => (e) => {
    e.preventDefault();
    const errors = validateForm(values, validationRules);
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      onSubmit(values);
    }
  };

  const updateValues = useCallback((newValues) => {
    setValues(newValues);
  }, []);

  return { handleChange, handleSubmit, values, updateValues, errors };
}
