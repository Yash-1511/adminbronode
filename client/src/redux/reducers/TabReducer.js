import { COPY_COURSE, TABPANEL_CATEGORY } from '../actions/Type';

const initialState = {
  courseList: [],
  tabPanel: 0
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case TABPANEL_CATEGORY:
      return { ...state, tabPanel: payload };
    case COPY_COURSE:
      return { ...state, courseList: payload };
    default:
      return state;
  }
};
