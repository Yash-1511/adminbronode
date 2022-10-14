import {
  FETCH_API_USER_LOGIN,
  USER_LOGOUT,
  USER_FORGOT_PASSWORD,
  LOAD_USER,
  FETCH_API_ADD_FAVORITE,
  FETCH_API_REMOVE_FAVORITE,
} from '../actions/Type';

const initialState = {
  user: {},
  authentication: false,
  forgotPassword: false,
};

export default (state = initialState, { type, payload }) => {
  let { favoriteCourse } = state.user;

  switch (type) {
    case LOAD_USER:
    case FETCH_API_USER_LOGIN:
      return { ...state, user: payload.data, authentication: true };
    case USER_LOGOUT:
      return { ...state, user: payload, authentication: false };
    case USER_FORGOT_PASSWORD:
      return { ...state, forgotPassword: payload };
    case FETCH_API_ADD_FAVORITE:
      let course = { course: payload };
      favoriteCourse.push(course);
      return { ...state, user: { ...state.user, favoriteCourse } };
    case FETCH_API_REMOVE_FAVORITE:
      favoriteCourse = favoriteCourse.filter(
        (item) => item.course._id !== payload._id
      );
      return { ...state, user: { ...state.user, favoriteCourse } };
    default:
      return state;
  }
};
