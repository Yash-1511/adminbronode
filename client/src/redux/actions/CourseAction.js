import bcrypt from 'bcryptjs';
import { resConnector } from '../../commons/CustomAxios';
import { reduxAction } from './ReduxAction';
import { FETCH_API_ALL_COURSE, FETCH_API_COURSE_FEATURE, FETCH_API_COURSE_MOST_POPULAR, FETCH_API_COURSE_NEW, FETCH_API_DETAILS_COURSE, RESET_COURSE_START } from './Type';

const status = ['processing', 'active', 'hide', 'all'];

export const fetchCoursePopular = (id, isTopic) => async (dispatch) => {
  const params = isTopic
    ? { limit: 20, sort: '-studentQuantity', topic: id }
    : { limit: 20, sort: '-studentQuantity', category: id };

  const response = await resConnector({
    url: `/course`,
    method: 'get',
    params: { ...params, status: await bcrypt.hash(status[1], 5) },
  });
  dispatch(reduxAction(FETCH_API_COURSE_MOST_POPULAR, response.data));
};

export const fetchCourseFeature = (category) => async (dispatch) => {
  const response = await resConnector({
    url: `/course`,
    method: 'get',
    params: {
      limit: 10,
      sort: '-ratingAverage',
      category,
      status: await bcrypt.hash(status[1], 5),
    },
  });
  dispatch(reduxAction(FETCH_API_COURSE_FEATURE, response.data));
};

export const fetchCourseNew = (id, isTopic) => async (dispatch) => {
  const params = isTopic
    ? { limit: 20, topic: id }
    : { limit: 20, category: id };

  const response = await resConnector({
    url: `/course`,
    method: 'get',
    params: { ...params, status: await bcrypt.hash(status[1], 5) },
  });
  dispatch(reduxAction(FETCH_API_COURSE_NEW, response.data));
};

export const fetchAllCourse = (id, query, isTopic) => async (dispatch) => {
  const params = isTopic ? { ...query, topic: id } : { ...query, category: id };
  const response = await resConnector({
    url: `/course`,
    method: 'get',
    params: { ...params, status: await bcrypt.hash(status[1], 5) },
  });
  dispatch(reduxAction(FETCH_API_ALL_COURSE, response.data));
};

export const resetCourseStart = () => (dispatch) => {
  dispatch(reduxAction(RESET_COURSE_START, []));
};

export const fetchDetailsCourse = (courseID) => async (dispatch) => {
  const response = await resConnector({
    url: `/course/${courseID}`,
    method: 'get',
    params: { status: await bcrypt.hash(status[1], 5) },
  });
  dispatch(reduxAction(FETCH_API_DETAILS_COURSE, response.data));
};
