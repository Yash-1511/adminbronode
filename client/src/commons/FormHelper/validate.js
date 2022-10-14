export const checkRequied = (value) =>
  value ? undefined : 'Bạn không được bỏ trống';

export const checkEmail = (value) =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Email không hợp lệ'
    : undefined;

export const minLength = (value, min) =>
  value && value.length < min ? `Phải có ít nhất ${min} kí tự` : undefined;

export const checkPassword = (password, confirmPassword) =>
  password === confirmPassword
    ? undefined
    : 'Xác nhận mật khẩu không trùng với mật khẩu mới';
