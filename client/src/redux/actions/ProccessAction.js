import { resConnector } from '../../commons/CustomAxios';
import { reduxAction } from './ReduxAction';
import { ADD_PROCCESS, CREATE_PROCCESS, DELETE_PROCCESS } from './Type';

export const createProccess = (proccesses, paidId) => async (dispatch) => {
  const proccessList = proccesses ? proccesses.mapKeys(true) : null;
  dispatch(reduxAction(CREATE_PROCCESS, [proccessList, paidId]));
};

export const addProccess = (proccess) => async (dispatch) => {
  dispatch(reduxAction(ADD_PROCCESS, proccess));
};

export const deleteProccess = (proccess) => async (dispatch) => {
  dispatch(reduxAction(DELETE_PROCCESS, proccess));
};

export const updateAPIProccess = (paidId) => async (dispatch, getState) => {
  try {
    const proccess = Object.keys(getState().proccess.proccesses);
    const response = await resConnector({
      url: `/paid/${paidId}`,
      method: 'put',
      data: { proccess },
    });
  } catch (error) {
    console.log(error);
  }
  //   dispatch(reduxAction(FETCH_API_CATEGORY, response.data));
};
