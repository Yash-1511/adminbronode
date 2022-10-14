import { Box, Button, withStyles } from '@material-ui/core';
import EmailRoundedIcon from '@material-ui/icons/EmailRounded';
import LockRoundedIcon from '@material-ui/icons/LockRounded';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import React from 'react';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form';
import renderTextField from '../../../commons/FormHelper/renderTextField';
import style from './style';
import validate from './validate';
import Alert from '../Alert';
import { useDispatch } from 'react-redux';
import { signUp } from '../../../redux/actions/AuthAction';

const index = (props) => {
  const { classes, handleSubmit, invalid, submitting, reset } = props;
  const dispatch = useDispatch();

  const clickLogin = () => {
    document.querySelector('.index-closeButton-239').click();
    document.querySelector('#login').click();
  };

  const submitForm = async (data) => {
    const [fristName, lastName] = data.fullName.trim().split(/ (.*)/);
    delete data['fullName'];
    data['password'] = data['password'].trim();
    data['passwordConfirm'] = data['passwordConfirm'].trim();
    data = { ...data, fristName, lastName };

    dispatch(signUp(data, reset, clickLogin));
  };

  return (
    <>
      <Alert />
      <form className={classes.root} onSubmit={handleSubmit(submitForm)}>
        <Field
          name="fullName"
          component={renderTextField}
          label="Họ và tên"
          variant="outlined"
          fullWidth
          InputProps={{
            endAdornment: <PersonRoundedIcon />,
          }}
        />
        <Field
          name="email"
          component={renderTextField}
          label="Email"
          variant="outlined"
          fullWidth
          InputProps={{
            endAdornment: <EmailRoundedIcon />,
          }}
        />
        <Field
          name="password"
          component={renderTextField}
          label="Mật khẩu"
          variant="outlined"
          fullWidth
          type="password"
          InputProps={{
            endAdornment: <LockRoundedIcon />,
          }}
        />
        <Field
          name="passwordConfirm"
          component={renderTextField}
          label="Nhập lại mật khẩu"
          type="password"
          variant="outlined"
          fullWidth
          InputProps={{
            endAdornment: <LockRoundedIcon />,
          }}
        />
        <Button
          variant="contained"
          color="primary"
          disableElevation
          className={classes.button}
          fullWidth
          size="large"
          type="submit"
          disabled={invalid || submitting}
        >
          Đăng ký
        </Button>{' '}
      </form>
      <Box borderColor="#dedfe0" mt={4} textAlign="center" borderTop={1} py={2}>
        Bạn đã tài khoản?{' '}
        <Box
          display="inline"
          color="primary.main"
          onClick={clickLogin}
          style={{ cursor: 'pointer' }}
        >
          Đăng nhập
        </Box>
      </Box>
    </>
  );
};

export default compose(
  withStyles(style),
  reduxForm({ form: 'signUpForm', validate })
)(index);
