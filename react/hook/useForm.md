**Here is an example of how you can create a hook for showing errors on empty or invalid inputs in a form using the `onBlur` event, as well as handle the form submission:**

```jsx
import { useState } from "react";

function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  function handleChange(event) {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  }

  function handleBlur(event) {
    if (!event.target.value) {
      setErrors({
        ...errors,
        [event.target.name]: "This field is required",
      });
    } else {
      setErrors({
        ...errors,
        [event.target.name]: "",
      });
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    // Perform form validation here

    if (Object.values(errors).every(error => error === "")) {
      // Form is valid, submit the form
    }
  }

  return {
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
  };
}

export default useForm;
```

You can then use this hook in your form component like this:

Copy code

```jsx
import useForm from "./useForm";

function Form() {
  const { values, errors, handleChange, handleBlur, handleSubmit } = useForm({
    email: "",
    password: "",
  });

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">
        Email
        <input
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </label>
      <label htmlFor="password">
        Password
        <input
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.password && <span className="error">{errors.password}</span>}
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}
```

This hook manages the form state, including the values of the form inputs, any errors that are displayed, and the form submission event. The `handleBlur` function checks if the input is empty and displays an error message if it is. The `handleSubmit` function prevents the default form submission behavior and performs form validation before deciding whether to submit the form or not.

I hope this helps! Let me know if you have any further questions.

```jsx
import { useState } from 'react';

function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  function handleChange(event) {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  }

  function handleBlur(event) {
    const isPhoneNumber = /^\d{10}$/.test(event.target.value);
    const isEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(event.target.value);
    const isWebsite = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/i.test(event.target.value);
    const isPinCode = /^\d{6}$/.test(event.target.value);
    const isTextArea = event.target.type === 'textarea';

    if (!event.target.value) {
      setErrors({
        ...errors,
        [event.target.name]: 'This field is required'
      });
    } else if (event.target.name === 'phone' && !isPhoneNumber) {
      setErrors({
        ...errors,
        [event.target.name]: 'Please enter a valid phone number'
      });
    } else if (event.target.name === 'email' && !isEmail) {
      setErrors({
        ...errors,
        [event.target.name]: 'Please enter a valid email address'
      });
    } else if (event.target.name === 'website' && !isWebsite) {
      setErrors({
        ...errors,
        [event.target.name]: 'Please enter a valid website URL'
      });
    } else if (event.target.name === 'pinCode' && !isPinCode) {
      setErrors({
        ...errors,
        [event.target.name]: 'Please enter a valid pin code'
      });
    } else if (isTextArea && event.target.value.length < 10) {
      setErrors({
        ...errors,
        [event.target.name]: 'Please enter at least 10 characters'
      });
    } else if (isTextArea && event.target.value.length > 30) {
      setErrors({
        ...errors,
        [event.target.name]: 'Please enter no more than 30 characters'
      });
    } else {
      setErrors({
        ...errors,
        [event.target.name]: ''
      });
    }
  }

```

## IMPROVED

```jsx
import { useState } from "react";

function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const conditions = {
    phone: value => /^\d{10}$/.test(value),
    email: value => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value),
    website: value =>
      /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/i.test(
        value
      ),
    pinCode: value => /^\d{6}$/.test(value),
    textArea: value => value.length >= 10 && value.length <= 30,
  };

  function handleChange(event) {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  }

  function handleBlur(event) {
    const condition = conditions[event.target.name];

    if (!event.target.value) {
      setErrors({
        ...errors,
        [event.target.name]: "This field is required",
      });
    } else if (condition && !condition(event.target.value)) {
      setErrors({
        ...errors,
        [event.target.name]: `Please enter a valid ${event.target.name}`,
      });
    } else {
      setErrors({
        ...errors,
        [event.target.name]: "",
      });
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    // Perform form validation here

    if (Object.values(errors).every(error => error === "")) {
      // Form is valid, submit the form
    }
  }

  return {
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
  };
}

export default useForm;
```
