import {
  ADD_PROCCESS,
  CREATE_PROCCESS,
  DELETE_PROCCESS,
} from '../actions/Type';

const initialState = {
  paidId: null,
  proccesses: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case CREATE_PROCCESS:
      return { ...state, proccesses: payload[0], paidId: payload[1] };
    case ADD_PROCCESS:
      return {
        ...state,
        proccesses: { ...state.proccesses, [payload]: payload },
      };
    case DELETE_PROCCESS:
      const { [payload]: _, ...newProccess } = state.proccesses;
      return {
        ...state,
        proccesses: newProccess,
      };
    default:
      return state;
  }
};
