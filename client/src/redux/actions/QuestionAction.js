import { resConnector } from '../../commons/CustomAxios';
import { reduxAction } from './ReduxAction';
import {
  DISABLE_LOAD_MORE,
  API_ADD_QUESTION,
  API_UPDATE_QUESTION,
  FETCH_API_QUESTION_COURSE,
  API_ADD_REPLY_QUESTION,
  API_DELETE_QUESTION,
  API_UPDATE_REPLY_QUESTION,
  API_DELETE_REPLY_QUESTION,
} from './Type';

export const fetchQuestionCourse = (courseID, query) => async (dispatch) => {
  let { data } = await resConnector({
    url: `/question`,
    method: 'get',
    params: {
      course: courseID,
      status: true,
      ...query,
    },
  });

  if (data['length'] !== 0) {
    data = data.data.mapKeys('_id');
    dispatch(reduxAction(FETCH_API_QUESTION_COURSE, data));
    dispatch(reduxAction(DISABLE_LOAD_MORE, false));
  } else if (query.user || query.lecture) {
    dispatch(reduxAction(FETCH_API_QUESTION_COURSE, {}));
    dispatch(reduxAction(DISABLE_LOAD_MORE, true));
  } else {
    dispatch(reduxAction(DISABLE_LOAD_MORE, true));
  }
};

export const addQuestion = (data) => async (dispatch) => {
  try {
    let response = await resConnector({
      url: `/question`,
      method: 'post',
      data,
    });

    dispatch(reduxAction(API_ADD_QUESTION, response.data.data));
  } catch ({ response }) {
    console.log(response);
  }
};

export const updateQuestion = (questionId, data) => async (dispatch) => {
  try {
    let response = await resConnector({
      url: `/question/${questionId}`,
      method: 'put',
      data,
    });

    dispatch(reduxAction(API_UPDATE_QUESTION, response.data.data));
  } catch ({ response }) {
    console.log(response);
  }
};

export const deleteQuestion = (questionId) => async (dispatch) => {
  try {
    let response = await resConnector({
      url: `/question/${questionId}`,
      method: 'delete',
    });

    dispatch(reduxAction(API_DELETE_QUESTION, questionId));
  } catch ({ response }) {
    console.log(response);
  }
};

export const addReplyQuestion = (questionId, data) => async (dispatch) => {
  try {
    let response = await resConnector({
      url: `/question/${questionId}/reply`,
      method: 'post',
      data,
    });

    dispatch(reduxAction(API_ADD_REPLY_QUESTION, response.data.data));
  } catch ({ response }) {
    console.log(response);
  }
};

export const updateReplyQuestion = (
  questionId,
  replyQuestionId,
  data
) => async (dispatch) => {
  try {
    let response = await resConnector({
      url: `/question/${questionId}/reply/${replyQuestionId}`,
      method: 'put',
      data,
    });

    dispatch(reduxAction(API_UPDATE_REPLY_QUESTION, response.data.data));
  } catch ({ response }) {
    console.log(response);
  }
};

export const deleteReplyQuestion = (questionId, replyQuestionId) => async (
  dispatch
) => {
  try {
    let response = await resConnector({
      url: `/question/${questionId}/reply/${replyQuestionId}`,
      method: 'delete',
    });

    dispatch(
      reduxAction(API_DELETE_REPLY_QUESTION, { questionId, replyQuestionId })
    );
  } catch ({ response }) {
    console.log(response);
  }
};
