import { Box, Button, TextField, withStyles } from '@material-ui/core';
import EmailRoundedIcon from '@material-ui/icons/EmailRounded';
import FacebookIcon from '@material-ui/icons/Facebook';
import GTranslateIcon from '@material-ui/icons/GTranslate';
import LockRoundedIcon from '@material-ui/icons/LockRounded';
import React from 'react';
import style from './style';
import ResetPassword from '../ForgotPassword';
import DialogCustom from '../DialogCustom';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import renderTextField from '../../../commons/FormHelper/renderTextField';
import validate from './validate';
import Alert from '../Alert';
import { signIn, signInWithSocial } from '../../../redux/actions/AuthAction';
import { useDispatch } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import { FACEBOOK_CLIENT_ID, GOOGLE_CLIENT_ID } from '../../../../config/key';

const index = (props) => {
  const { classes, handleSubmit, invalid, submitting } = props;
  const dispatch = useDispatch();

  const clickSignUp = () => {
    document.querySelector('.index-closeButton-239').click();
    document.querySelector('#signUp').click();
  };

  const submitForm = (data) => {
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const element = data[key];
        data[key] = element.trim();
      }
    }
    dispatch(signIn(data));
  };

  const loginSocialResponse = (response) => {
    const { graphDomain, accessToken } = response;
    const tokenBlob = new Blob(
      [JSON.stringify({ access_token: accessToken }, null, 2)],
      { type: 'application/json' }
    );
    if (graphDomain) {
      dispatch(signInWithSocial(tokenBlob, 'facebook'));
    } else {
      dispatch(signInWithSocial(tokenBlob, 'google'));
    }
  };

  const onFailure = (error) => {
    console.log(error);
  };

  return (
    <>
      <Box my={1}>
        <FacebookLogin
          appId={FACEBOOK_CLIENT_ID}
          callback={loginSocialResponse}
          size="small"
          fields="name,email,picture"
          textButton="Đăng nhập với Facebook"
        />
        <GoogleLogin
          clientId={GOOGLE_CLIENT_ID}
          buttonText="Đăng nhập với Google"
          onSuccess={loginSocialResponse}
          onFailure={onFailure}
        />
      </Box>
      <Alert />
      <form onSubmit={handleSubmit(submitForm)}>
        <Field
          name="email"
          component={renderTextField}
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          InputProps={{
            endAdornment: <EmailRoundedIcon />,
          }}
        />
        <Field
          name="password"
          component={renderTextField}
          label="Password"
          variant="outlined"
          fullWidth
          type="password"
          InputProps={{
            endAdornment: <LockRoundedIcon />,
          }}
        />
        <Box my={1}>
          <Button
            variant="contained"
            color="primary"
            disableElevation
            style={{ textTransform: 'none' }}
            fullWidth
            size="large"
            type="submit"
            disabled={invalid || submitting}
          >
            Đăng nhập
          </Button>
        </Box>
      </form>
      <Box mt={2} textAlign="center">
        hoặc{' '}
        <DialogCustom
          title="Quên mật khẩu"
          button={
            <Box
              display="inline"
              color="primary.main"
              style={{ cursor: 'pointer' }}
            >
              Quên mật khẩu
            </Box>
          }
          content={<ResetPassword />}
        />
      </Box>
      <Box mt={4} textAlign="center">
        Chưa có tài khoản?{' '}
        <Box
          display="inline"
          color="primary.main"
          style={{ cursor: 'pointer' }}
          onClick={clickSignUp}
        >
          Đăng ký
        </Box>
      </Box>
    </>
  );
};

export default compose(
  withStyles(style),
  reduxForm({ form: 'formLogin', validate })
)(index);
