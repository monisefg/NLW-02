import { useState } from 'react';

export interface Form {
  name: string;
  avatar: string;
  whatsapp: string;
  bio: string;
  subject: string;
  cost: string;
}

function useForm(initialValues: Form) {
  const [values, setValues] = useState(initialValues);

  function setValue(key: string, value: string) {
    setValues({ ...values, [key]: value });
  }

  function handleChange(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const nameEvent = event.target.getAttribute('name') || '';

    setValue(nameEvent, event.target.value);
  }

  function clearForm() {
    setValues(initialValues);
  }
  return { values, handleChange, clearForm };
}

export default useForm;
