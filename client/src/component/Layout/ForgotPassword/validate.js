import { checkEmail, checkRequied } from '../../../commons/FormHelper/validate';

const validate = (values) => {
  const errors = {};
  const { email } = values;
  const requiredFields = ['email'];

  requiredFields.forEach((field) => {
    errors[field] = checkRequied(values[field]);
  });

  if (email) errors['email'] = checkEmail(email);

  return errors;
};

export default validate;
