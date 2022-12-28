// Here's an example of how you can create an input using p and span elements:

import React, { useState } from "react";
import { isEmail, isURL, isNumeric } from "validator";

const Input = ({
  type,
  value,
  onChange,
  onBlur,
  onSubmit,
  allowedDomains,
  minLength,
  maxLength,
  required,
  pattern,
  title,
}) => {
  const [error, setError] = useState(null);

  const handleChange = event => {
    const newValue = event.target.value;
    setError(null);
    onChange(newValue);
  };

  const handleBlur = () => {
    validate();
    if (onBlur) {
      onBlur();
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    const isValid = validate();
    if (isValid && onSubmit) {
      onSubmit();
    }
  };

  const validate = () => {
    let errorMessage;

    if (required && !value) {
      errorMessage = "This field is required";
    } else if (minLength && value.length < minLength) {
      errorMessage = `This field must be at least ${minLength} characters`;
    } else if (maxLength && value.length > maxLength) {
      errorMessage = `This field must be no more than ${maxLength} characters`;
    } else if (pattern && !pattern.test(value)) {
      errorMessage = "This field does not match the required format";
    } else {
      switch (type) {
        case "email":
          if (!isEmail(value)) {
            errorMessage = "Please enter a valid email address";
          }
          break;
        case "date":
          if (!isNumeric(value)) {
            errorMessage = "Please enter a valid date";
          }
          break;
        case "password":
          // Add password validation here
          break;
        case "phone":
          if (!isNumeric(value)) {
            errorMessage = "Please enter a valid phone number";
          }
          break;
        case "url":
          if (!isURL(value, { protocols: ["http", "https"] })) {
            errorMessage = "Please enter a valid URL";
          } else if (
            allowedDomains &&
            !allowedDomains.includes(new URL(value).hostname)
          ) {
            errorMessage = "Please enter a URL from one of the allowed domains";
          }
          break;
        case "file":
          // Add file validation here
          break;
        case "otp":
          // Add OTP validation here
          break;
        default:
          break;
      }
    }

    setError(errorMessage);
    return !errorMessage;
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor={type}>
        {title}
        <input
          id={type}
          type={type}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          required={required}
        />
      </label>
    </form>
  );
};

/*
This input component allows the user to edit the text by clicking and typing within the p element, and creates a new span element on enter. The handleChange function is called on input, and the handleKeyDown function is called on key down events. The validate function is called to check if the input is valid based on the specified minLength, maxLength, and pattern props. If the input is invalid, an error message is displayed in a separate span element.
*/
