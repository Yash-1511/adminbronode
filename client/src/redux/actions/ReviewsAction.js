import { resConnector } from '../../commons/CustomAxios';
import { reduxAction } from './ReduxAction';
import {
  FETCH_API_REVIEWS,
  FETCH_API_ADD_REVIEWS,
  API_ADD_REVIEW,
  API_EDIT_REVIEW,
  ALERT_ON,
  ALERT_OFF,
} from './Type';

export const fetchReviews = (query, isAddReviews) => async (dispatch) => {
  const response = await resConnector({
    url: '/review',
    method: 'get',
    params: query,
  });
  if (isAddReviews) {
    dispatch(reduxAction(FETCH_API_ADD_REVIEWS, response.data));
  } else {
    dispatch(reduxAction(FETCH_API_REVIEWS, response.data));
  }
};

export const addReview = (data) => async (dispatch) => {
  try {
    const response = await resConnector({
      url: '/review',
      method: 'post',
      data,
    });

    dispatch(reduxAction(API_ADD_REVIEW, response.data));
    dispatch(
      reduxAction(ALERT_ON, {
        arrMessage: ['Cám ơn bạn đã đánh giá khóa học'],
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
      document.querySelector('#close-dialog').click();
    }, 3000);
  } catch (error) {
    console.log('error', error);
  }
};

export const editReview = (reviewID, data) => async (dispatch) => {
  try {
    const response = await resConnector({
      url: `/review/${reviewID}`,
      method: 'PUT',
      data,
    });

    dispatch(reduxAction(API_EDIT_REVIEW, response.data));
    dispatch(
      reduxAction(ALERT_ON, {
        arrMessage: ['Bạn đã sửa đánh giá khóa học'],
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
      document.querySelector('#close-dialog').click();
    }, 3000);
  } catch (error) {
    console.log('error', error);
  }
};
