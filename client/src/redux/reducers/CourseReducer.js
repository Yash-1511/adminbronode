import {
  FETCH_API_COURSE_MOST_POPULAR,
  FETCH_API_COURSE_NEW,
  RESET_COURSE_START,
  FETCH_API_COURSE_FEATURE,
  FETCH_API_ALL_COURSE,
  FETCH_API_DETAILS_COURSE,
  API_ADD_REVIEW,
  API_EDIT_REVIEW,
} from '../actions/Type';

const initialState = {
  courseStart: [],
  courseFeature: [],
  allCourse: [],
  courseDetails: {},
};

export default (state = initialState, { type, payload }) => {
  let courseStart = [...state.courseStart];

  switch (type) {
    case FETCH_API_COURSE_MOST_POPULAR:
      courseStart.push({ title: 'Popular', courses: payload.data });
      return { ...state, courseStart };
    case FETCH_API_COURSE_NEW:
      courseStart.push({ title: 'New', courses: payload.data });
      return { ...state, courseStart };
    case FETCH_API_COURSE_FEATURE:
      return { ...state, courseFeature: payload.data };
    case FETCH_API_ALL_COURSE:
      return { ...state, allCourse: payload.data };
    case FETCH_API_DETAILS_COURSE:
      return { ...state, courseDetails: payload.data };
    case RESET_COURSE_START:
      courseStart = payload;
      return { ...state, courseStart };
    case API_ADD_REVIEW: {
      let reviews = [...state.courseDetails.reviews, payload.data];
      return { ...state, courseDetails: { ...state.courseDetails, reviews } };
    }
    case API_EDIT_REVIEW: {
      let reviews = state.courseDetails.reviews.map((item) =>
        item._id === payload.data._id ? payload.data : item
      );
      return { ...state, courseDetails: { ...state.courseDetails, reviews } };
    }
    default:
      return state;
  }
};
