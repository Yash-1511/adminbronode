import { resConnector } from '../../commons/CustomAxios';
import { reduxAction } from './ReduxAction';
import { FETCH_API_ADD_FAVORITE, FETCH_API_REMOVE_FAVORITE } from './Type';

export const fetchAddFavorite = (course) => async (dispatch) => {
  try {
    const response = await resConnector({
      url: '/user/add-favorite',
      method: 'patch',
      data: { courseId: course._id },
    });
    if (response.status === 200) {
      dispatch(reduxAction(FETCH_API_ADD_FAVORITE, course));
    }
  } catch (error) {
    console.log(error);
  }
};

export const fetchRemoveFavorite = (course) => async (dispatch) => {
  try {
    const response = await resConnector({
      url: '/user/remove-favorite',
      method: 'delete',
      data: { courseId: course._id },
    });
    if (response.status === 200) {
      dispatch(reduxAction(FETCH_API_REMOVE_FAVORITE, course));
    }
  } catch (error) {
    console.log(error);
  }
};
