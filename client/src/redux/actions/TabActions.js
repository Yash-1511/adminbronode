import { reduxAction } from './ReduxAction';
import { COPY_COURSE, TABPANEL_CATEGORY } from './Type';

export const copyCourseList = courseList => async dispatch => {
  dispatch(reduxAction(COPY_COURSE, courseList));
};

export const tabPanelCategory = index => dispatch => {
  dispatch(reduxAction(TABPANEL_CATEGORY, index));
};
