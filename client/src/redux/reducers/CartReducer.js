import {
  ADD_ITEM_CART,
  REMOVE_ITEM_CART,
  LOAD_CART,
  ADD_ITEM_SAVE_COURSE,
  REMOVE_ITEM_SAVE_COURSE,
  LOAD_SAVE_COURSE,
  SALE_PAYMENT,
} from '../actions/Type';

const initialState = {
  cart: [],
  save: [],
  sale: null,
};

export default (state = initialState, { type, payload }) => {
  let newCart = state.cart;
  let newSave = state.save;

  switch (type) {
    case LOAD_CART:
      return { ...state, cart: payload };
    case ADD_ITEM_CART:
      newCart.push(payload);
      localStorage.setItem('cart', JSON.stringify(newCart));
      return { ...state, cart: newCart };
    case REMOVE_ITEM_CART:
      newCart = newCart.filter((item) => item.id !== payload);
      localStorage.setItem('cart', JSON.stringify(newCart));
      return { ...state, cart: newCart };
    case LOAD_SAVE_COURSE:
      return { ...state, save: payload };
    case ADD_ITEM_SAVE_COURSE:
      newSave.push(payload);
      localStorage.setItem('save', JSON.stringify(newSave));
      return { ...state, save: newSave };
    case REMOVE_ITEM_SAVE_COURSE:
      newSave = newSave.findAndRemove(payload, 'id');
      localStorage.setItem('save', JSON.stringify(newSave));
      return { ...state, save: newSave };
    case SALE_PAYMENT:
      return { ...state, sale: payload };
    default:
      return state;
  }
};
