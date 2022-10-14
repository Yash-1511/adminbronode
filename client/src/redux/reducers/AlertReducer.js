import { ALERT_ON, ALERT_OFF } from '../actions/Type';

const initialState = {
  arrMessage: [],
  status: '',
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ALERT_ON:
      const { arrMessage, status } = payload;
      return { ...state, arrMessage, status };
    case ALERT_OFF:
      return {
        ...state,
        arrMessage: payload.arrMessage,
        status: payload.status,
      };
    default:
      return state;
  }
};
