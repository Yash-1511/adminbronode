import {
  FETCH_API_REVIEWS,
  FETCH_API_ADD_REVIEWS,
  API_ADD_REVIEW,
} from '../actions/Type';

const initialState = {
  reviews: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_API_REVIEWS:
      return { ...state, reviews: payload.data };
    case FETCH_API_ADD_REVIEWS:
      return { ...state, reviews: state.reviews.concat(payload.data) };
    default:
      return state;
  }
};
