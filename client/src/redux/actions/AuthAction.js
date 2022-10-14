import { resConnector } from '../../commons/CustomAxios';
import { reduxAction } from './ReduxAction';
import {
  ALERT_ON,
  FETCH_API_USER_LOGIN,
  USER_LOGOUT,
  USER_FORGOT_PASSWORD,
  ALERT_OFF,
  LOAD_USER,
} from './Type';
import { DOMAIN } from '../../../config/key'

const signUpSuccess = [
  'Đã tạo thành công. Bạn sẽ được chuyển đến trang đăng nhập sau 3s giây.',
];

const errorAlert = (response) => {
  const newAlert = [];
  for (const key in response.data.error.errors) {
    if (response.data.error.errors.hasOwnProperty(key)) {
      const { message } = response.data.error.errors[key];
      newAlert.push(message);
    }
  }
  return newAlert;
};

export const signUp = (data, reset, redirectLogin) => async (dispatch) => {
  try {
    const response = await resConnector({
      url: `/user/signup`,
      method: 'post',
      data,
    });
    if (response.data.status === 'success') {
      reset();
      dispatch(
        reduxAction(ALERT_ON, { arrMessage: signUpSuccess, status: 'success' })
      );
      setTimeout(() => {
        redirectLogin();
      }, 3000);
    }
  } catch ({ response }) {
    const arrMessage = errorAlert(response);
    dispatch(reduxAction(ALERT_ON, { arrMessage, status: 'error' }));
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    const response = await resConnector({
      url: `/user/auth`,
      method: 'get',
    });
    if (response.data.status === 'success') {
      dispatch(reduxAction(LOAD_USER, response.data));
    }
  } catch ({ response }) {
    localStorage.removeItem('login');
    dispatch(reduxAction(USER_LOGOUT, {}));
  }
};

export const signIn = (data) => async (dispatch) => {
  try {
    const response = await resConnector({
      url: `/user/signin`,
      method: 'post',
      data,
    });
    if (response.data.status === 'success') {
      document.querySelector('#close-dialog').click();
      localStorage.setItem('login', response.data.token);
      dispatch(reduxAction(FETCH_API_USER_LOGIN, response.data));
    }
  } catch ({ response }) {
    dispatch(
      reduxAction(ALERT_ON, {
        arrMessage: [response.data.message],
        status: 'error',
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
  }
};

export const forgotPasswordAPI = (data) => async (dispatch) => {
  try {
    const response = await resConnector({
      url: `/user/forgot-password`,
      method: 'post',
      data,
    });
    if (response.data.status === 'success') {
      dispatch(
        reduxAction(ALERT_ON, {
          arrMessage: [response.data.message],
          status: 'success',
        })
      );
      setTimeout(() => {
        document.querySelector('#close-dialog').click();
      }, 3000);
    }
  } catch ({ response }) {
    dispatch(
      reduxAction(ALERT_ON, {
        arrMessage: [response.data.message],
        status: 'error',
      })
    );
  }
};

export const resetPassword = (data, token, redirect) => async (dispatch) => {
  try {
    const response = await resConnector({
      url: `/user/reset-password/${token}`,
      method: 'post',
      data,
    });
    if (response.data.status === 'success') {
      dispatch(
        reduxAction(ALERT_ON, {
          arrMessage: [response.data.message],
          status: 'success',
        })
      );
      setTimeout(() => {
        redirect.push('/');
        dispatch(
          reduxAction(ALERT_OFF, {
            arrMessage: [],
            status: '',
          })
        );
      }, 3000);
    }
  } catch ({ response }) {
    dispatch(
      reduxAction(ALERT_ON, {
        arrMessage: [response.data.message],
        status: 'error',
      })
    );
  }
};

export const logOut = () => (dispatch) => {
  localStorage.removeItem('login');
  dispatch(reduxAction(USER_LOGOUT, {}));
};

export const forgotPassword = (isActive) => (dispatch) => {
  isActive
    ? dispatch(reduxAction(USER_FORGOT_PASSWORD, true))
    : dispatch(reduxAction(USER_FORGOT_PASSWORD, false));
};

export const signInWithSocial = (token, domain) => async (dispatch) => {
  try {
    const options = {
      method: 'POST',
      body: token,
      mode: 'cors',
      cache: 'default',
    };
    const r = await fetch(
      `${DOMAIN}/user/auth/${domain}`,
      options
    );
    const response = await r.json();
    if (response.status === 'success') {
      document.querySelector('#close-dialog').click();
      localStorage.setItem('login', response.token);
      dispatch(reduxAction(FETCH_API_USER_LOGIN, response));
    }
  } catch ({ response }) {
    console.log('err', response);
    dispatch(
      reduxAction(ALERT_ON, {
        arrMessage: [response.data.message],
        status: 'error',
      })
    );
  }
};
