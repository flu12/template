const hasLowerCase = (str) => {
  return (/[a-z]/.test(str));
};

const hasUpperCase = (str) => {
  return (/[A-Z]/.test(str));
};

const hasNumbers = (str) => {
  return (/[0-9]/.test(str));
};

export const validatePassword = (values, key, errors) => {
  if (!values[key]) {
    errors[key] = 'Password is required';
  }
  else if (!hasLowerCase(values[key])) {
    errors[key] = 'Password requires at least one lower case letter';
  }
  else if (!hasUpperCase(values[key])) {
    errors[key] = 'Password requires at least one upper case letter';
  }
  else if (!hasNumbers(values[key])) {
    errors[key] = 'Password requires at least one number';
  }
  else if (values[key].length < 8) {
    errors[key] = 'Password requires at least 8 characters';
  }
  else if (!values[key].length > 50) {
    errors[key] = 'Password must be at most 50 characters';
  }
};
