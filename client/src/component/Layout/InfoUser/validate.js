import {
  checkRequied,
  checkPassword,
} from '../../../commons/FormHelper/validate';

const validate = (values) => {
  const errors = {};
  const { passwordNew, passwordConfirm } = values;
  const requiredFields = [
    'fristName',
    'lastName',
    'password',
    'passwordNew',
    'passwordConfirm',
  ];

  requiredFields.forEach((field) => {
    errors[field] = checkRequied(values[field]);
  });
  if (passwordConfirm && passwordNew)
    errors['passwordConfirm'] = checkPassword(passwordNew, passwordConfirm);

  return errors;
};

export default validate;
