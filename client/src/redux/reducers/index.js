import { combineReducers } from 'redux';
import categoryReducer from './CategoryReducer';
import alertReducer from './AlertReducer';
import courseReducer from './CourseReducer';
import tabReducer from './TabReducer';
import reviewsReducer from './ReviewsReducer';
import authReducer from './AuthReducer';
import cartReducer from './CartReducer';
import questionReducer from './QuestionReducer';
import proccessReducer from './ProccessReducer';
import { reducer as formReducer } from 'redux-form';

const RootReducer = combineReducers({
  category: categoryReducer,
  course: courseReducer,
  tab: tabReducer,
  reviews: reviewsReducer,
  form: formReducer,
  alert: alertReducer,
  auth: authReducer,
  cart: cartReducer,
  question: questionReducer,
  proccess: proccessReducer,
});

export default RootReducer;
