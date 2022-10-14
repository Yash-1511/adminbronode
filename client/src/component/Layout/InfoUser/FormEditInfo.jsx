import { Button, TextField, withStyles } from '@material-ui/core';
import React from 'react';
import AvatarEditor from 'react-avatar-editor';
import ContentProfile from './ContentProfile';
import { reduxForm, Field } from 'redux-form';
import renderTextField from '../../../commons/FormHelper/renderTextField';
import validate from './validate';
import style from './style';
import Alert from '../Alert';
import { compose } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import { resConnector } from '../../../commons/CustomAxios';
import { reduxAction } from '../../../redux/actions/ReduxAction';
import { ALERT_ON, ALERT_OFF } from '../../../redux/actions/Type';

const FormEditInfo = (props) => {
  const { handleSubmit, invalid, submitting, classes, change } = props;
  const [avatar, setAvatar] = React.useState('');
  const avatarRef = React.useRef(null);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const changeAvatar = (e) => {
    setAvatar(e.target.files[0]);
    console.log(e.target.files[0]);
    document.querySelector('#image').style.display = 'block';
  };

  const submitForm = async (data) => {
    // const img = avatarRef.current.getImage().toDataURL();
    // let imageURL;
    // fetch(img)
    //   .then((res) => res.blob())
    //   .then((blob) => {
    //     imageURL = window.URL.createObjectURL(blob);
    //     console.log(imageURL);
    //   });
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const element = data[key];
        data[key] = element.trim();
      }
    }

    try {
      await resConnector({ url: '/user/update-me', method: 'put', data });
      dispatch(
        reduxAction(ALERT_ON, {
          arrMessage: ['Đã sửa thông tin !!!'],
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
      }, 3000);
    } catch (error) {
      console.log('error', error);
    }
  };

  React.useEffect(() => {
    if (Object.keys(user).length > 0) {
      change('fristName', user.fristName);
      change('lastName', user.lastName);
    }
  }, [user]);

  return (
    <ContentProfile
      title="Thông tin tài khoản"
      desciption="Thêm thông tin về bản thân"
    >
      <Alert />
      <form onSubmit={handleSubmit(submitForm)} className={classes.formComent}>
        <Field
          name="fristName"
          component={renderTextField}
          fullWidth
          label="Họ"
          variant="outlined"
        />
        <Field
          name="lastName"
          component={renderTextField}
          fullWidth
          label="Tên"
          variant="outlined"
        />
        <AvatarEditor
          ref={avatarRef}
          image={avatar}
          width={250}
          height={250}
          border={50}
          borderRadius={150}
          color={[255, 255, 255, 0.6]} // RGBA
          scale={1.2}
          rotate={0}
          id="image"
          style={{
            display: 'none',
          }}
        />
        <input
          style={{
            display: 'block',
          }}
          type="file" // disabled
          id="avatar"
          onChange={changeAvatar}
        />

        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          disableElevation
          type="submit"
          disabled={invalid || submitting}
        >
          Lưu
        </Button>
      </form>
    </ContentProfile>
  );
};
export default compose(
  withStyles(style),
  reduxForm({ form: 'formEditInfoUser', validate })
)(FormEditInfo);
