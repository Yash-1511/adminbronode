import { checkRequied, minLength } from '../../../commons/FormHelper/validate';

const validate = (values) => {
  const errors = {};
  const { password, passwordConfirm } = values;
  const requiredFields = ['password', 'passwordConfirm'];

  requiredFields.forEach((field) => {
    errors[field] = checkRequied(values[field]);
  });

  if (password) errors['password'] = minLength(password, 8);
  if (passwordConfirm)
    errors['passwordConfirm'] = minLength(passwordConfirm, 8);
  if (password !== passwordConfirm)
    errors['passwordConfirm'] = 'Mật khẩu không trùng nhau';

  return errors;
};

export default validate;
