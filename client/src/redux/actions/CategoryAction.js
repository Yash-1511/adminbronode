import { resConnector } from '../../commons/CustomAxios';
import { reduxAction } from './ReduxAction';
import { FETCH_API_CATEGORY } from './Type';

export const fetchCategories = () => async (dispatch) => {
  const response = await resConnector({ url: '/category', method: 'get' });
  dispatch(reduxAction(FETCH_API_CATEGORY, response.data));
};
