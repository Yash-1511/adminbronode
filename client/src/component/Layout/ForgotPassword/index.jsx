import { Box, Button, withStyles } from '@material-ui/core';
import EmailRoundedIcon from '@material-ui/icons/EmailRounded';
import React from 'react';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form';
import renderTextField from '../../../commons/FormHelper/renderTextField';
import style from './style';
import { forgotPasswordAPI } from '../../../redux/actions/AuthAction';
import validate from './validate';
import Alert from '../Alert';
import { useDispatch } from 'react-redux';

const index = (props) => {
  const { classes, handleSubmit, invalid, submitting, reset } = props;
  const dispatch = useDispatch();

  const clickLogin = () => {
    document.querySelector('#close-dialog').click();
    setTimeout(() => {
      document.querySelector('#login').click();
    }, 500);
  };

  const submitForm = async (data) => {
    dispatch(forgotPasswordAPI(data));
  };

  return (
    <>
      <Alert />
      <form style={{ marginTop: '1rem' }} onSubmit={handleSubmit(submitForm)}>
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
        <Box mt={2} textAlign="center">
          <Button
            variant="contained"
            color="primary"
            disableElevation
            className={classes.button}
            size="large"
            type="submit"
            disabled={invalid || submitting}
          >
            Gửi
          </Button>

          <Box display="inline" mx={1}>
            hoặc
          </Box>
          <Box
            display="inline"
            color="primary.main"
            style={{ cursor: 'pointer' }}
            onClick={clickLogin}
          >
            Đăng nhập
          </Box>
        </Box>
      </form>
    </>
  );
};

export default compose(
  withStyles(style),
  reduxForm({ form: 'forgotPasswordForm', validate })
)(index);
