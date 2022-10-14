import { Box, Button, Toolbar, withStyles } from '@material-ui/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form';
import renderTextField from '../../../commons/FormHelper/renderTextField';
import {
  forgotPassword,
  resetPassword,
} from '../../../redux/actions/AuthAction';
import style from './style';
import validate from './validate';
import Alert from '../Alert';
import { Link, useParams, useHistory } from 'react-router-dom';

const index = (props) => {
  const { classes, handleSubmit, invalid, submitting } = props;
  let token = useParams()['token'];
  const dispatch = useDispatch();
  let history = useHistory();

  const submitForm = (data) => {
    dispatch(resetPassword(data, token, history));
  };

  React.useEffect(() => {
    dispatch(forgotPassword(true));
    return () => {
      dispatch(forgotPassword(false));
    };
  }, []);

  return (
    <>
      <Toolbar />
      <section className={classes.root}>
        <form className={classes.form} onSubmit={handleSubmit(submitForm)}>
          <Box fontSize={36} mb={2}>
            Đổi mật khẩu
          </Box>
          <Alert />
          <Box mt={2} mb={1}>
            <Field
              name="password"
              component={renderTextField}
              label="Mật khẩu"
              type="password"
              variant="outlined"
              fullWidth
            />
          </Box>
          <Box>
            <Field
              name="passwordConfirm"
              component={renderTextField}
              label="Nhập lại mật khẩu"
              variant="outlined"
              fullWidth
              type="password"
            />
          </Box>
          <Box mt={1}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disableElevation
              disabled={invalid || submitting}
            >
              Gửi
            </Button>{' '}
            <Button
              variant="contained"
              disableElevation
              component={Link}
              to="/"
            >
              Trở về
            </Button>
          </Box>
        </form>
      </section>
    </>
  );
};

export default compose(
  withStyles(style),
  reduxForm({ form: 'resetPasswordForm', validate })
)(index);
