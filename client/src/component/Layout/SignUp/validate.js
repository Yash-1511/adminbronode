import {
  checkRequied,
  checkEmail,
  minLength,
} from '../../../commons/FormHelper/validate';

const validate = (values) => {
  const errors = {};
  const { email, password, passwordConfirm, fullName } = values;
  const requiredFields = ['fullName', 'email', 'password', 'passwordConfirm'];

  requiredFields.forEach((field) => {
    errors[field] = checkRequied(values[field]);
  });

  if (fullName && fullName.trim().split(/ (.*)/).length !== 3)
    errors['fullName'] = 'Họ tên phải cách nhau bằng khoảng trắng';
  if (email) errors['email'] = checkEmail(email);
  if (password) errors['password'] = minLength(password, 8);
  if (passwordConfirm)
    errors['passwordConfirm'] = minLength(passwordConfirm, 8);
  if (password !== passwordConfirm)
    errors['passwordConfirm'] = 'Mật khẩu không trùng nhau';

  return errors;
};

export default validate;
