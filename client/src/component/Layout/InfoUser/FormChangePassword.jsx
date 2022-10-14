import { Box, Button, TextField, withStyles } from '@material-ui/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form';
import { resConnector } from '../../../commons/CustomAxios';
import renderTextField from '../../../commons/FormHelper/renderTextField';
import { logOut } from '../../../redux/actions/AuthAction';
import { reduxAction } from '../../../redux/actions/ReduxAction';
import { ALERT_OFF, ALERT_ON } from '../../../redux/actions/Type';
import Alert from '../Alert';
import ContentProfile from './ContentProfile';
import style from './style';
import validate from './validate';

const FormChangePassword = (props) => {
  const { handleSubmit, invalid, submitting, classes, change } = props;
  const dispatch = useDispatch();
  const history = useHistory();

  const submitForm = async (data) => {
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const element = data[key];
        data[key] = element.trim();
      }
    }

    try {
      const res = await resConnector({
        url: '/user/change-password',
        method: 'put',
        data,
      });
      dispatch(
        reduxAction(ALERT_ON, {
          arrMessage: [res.data.message],
          status: 'success',
        })
      );
      setTimeout(() => {
        dispatch(
          reduxAction(ALERT_OFF, {
            arrMessage: [],
            status: '',
          })
        );
        dispatch(logOut());
        history.push('/');
      }, 3000);
    } catch (error) {
      console.log('error', error);
    }
  };
  return (
    <ContentProfile
      title="Tài khoản"
      desciption="Chỉnh sửa cài đặt tài khoản của bạn và thay đổi mật khẩu của bạn ở đây."
    >
      <Box my={2} mb={4}>
        <TextField
          InputProps={{
            readOnly: true,
          }}
          label="Email"
          defaultValue="abc@gmail.com"
          variant="outlined"
          fullWidth
        />
      </Box>
      <Alert />
      <form onSubmit={handleSubmit(submitForm)} className={classes.formComent}>
        <Field
          name="password"
          component={renderTextField}
          fullWidth
          label="Mật khẩu cũ"
          type="password"
          variant="outlined"
        />
        <Field
          name="passwordNew"
          component={renderTextField}
          fullWidth
          label="Mật khẩu mới"
          variant="outlined"
          type="password"
        />
        <Field
          name="passwordConfirm"
          component={renderTextField}
          fullWidth
          label="Nhập lại mật khẩu"
          type="password"
          variant="outlined"
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          disableElevation
          type="submit"
          disabled={invalid || submitting}
        >
          Đổi mật khẩu
        </Button>
      </form>
    </ContentProfile>
  );
};
export default compose(
  withStyles(style),
  reduxForm({ form: 'formChangePassword', validate })
)(FormChangePassword);
