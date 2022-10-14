import { FETCH_API_CATEGORY, TABPANEL_CATEGORY } from '../actions/Type';

const initialState = {
  category: []
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_API_CATEGORY:
      return { ...state, category: payload.data };
    default:
      return state;
  }
};
