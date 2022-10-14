import { reduxAction } from './ReduxAction';
import {
  ADD_ITEM_CART,
  REMOVE_ITEM_CART,
  LOAD_CART,
  ADD_ITEM_SAVE_COURSE,
  REMOVE_ITEM_SAVE_COURSE,
  LOAD_SAVE_COURSE,
  SALE_PAYMENT,
} from './Type';

export const loadCart = () => async (dispatch) => {
  const courses = JSON.parse(localStorage.getItem('cart'));

  if (courses) {
    dispatch(reduxAction(LOAD_CART, courses));
  }
};

export const addItemCart = (course) => async (dispatch) => {
  dispatch(reduxAction(ADD_ITEM_CART, course));
};

export const removeItemCart = (id) => (dispatch) => {
  dispatch(reduxAction(REMOVE_ITEM_CART, id));
};

export const loadSaveCourse = () => async (dispatch) => {
  const courses = localStorage.getItem('save');

  if (courses) {
    dispatch(reduxAction(LOAD_SAVE_COURSE, JSON.parse(courses)));
  }
};

export const addItemSaveCourse = (course) => async (dispatch) => {
  dispatch(reduxAction(ADD_ITEM_SAVE_COURSE, course));
};

export const removeItemSaveCourse = (id) => (dispatch) => {
  dispatch(reduxAction(REMOVE_ITEM_SAVE_COURSE, id));
};

export const salePayment = (couponID, price) => (dispatch) => {
  dispatch(
    reduxAction(SALE_PAYMENT, couponID && price ? { couponID, price } : null)
  );
};
