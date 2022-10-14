import {
  checkRequied,
  checkEmail,
  minLength,
} from '../../../commons/FormHelper/validate';

const validate = (values) => {
  const errors = {};
  const { email, password } = values;
  const requiredFields = ['email', 'password'];

  requiredFields.forEach((field) => {
    errors[field] = checkRequied(values[field]);
  });

  if (email) errors['email'] = checkEmail(email);
  if (password) errors['password'] = minLength(password, 8);

  return errors;
};

export default validate;
