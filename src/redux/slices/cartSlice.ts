import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getCartFromLS } from '../../utils/getICartFromLS';
import { getTotalPriceFromLS } from '../../utils/getTotalPriceFromLS';
import Decimal from 'decimal.js';

type CartItem = {
  id: number;
  image: string;
  title: string;
  price: number;
  quantity: number;
  category?: string;
  description?: string;
};

type CartSliceState = {
  itemId: number;
  totalPrice: number;
  items: CartItem[];
  quantity: number;
  totalQuantity: number;
};

const initialState: CartSliceState = {
  itemId: 1,
  totalPrice: getTotalPriceFromLS() | 0,
  items: getCartFromLS() || [],
  quantity: 1,
  totalQuantity: 1,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setItemId(state, action: PayloadAction<number>) {
      state.itemId = action.payload;
    },
    // addProduct(state, action: PayloadAction<CartItem>) {
    //   const price = new Decimal(action.payload.price);
    //   const quantity = new Decimal(action.payload.quantity);

    //   state.items.push(action.payload);

    //   const itemTotal = price.times(quantity);
    //   const roundedTotal = itemTotal.toFixed(2);

    //   const currentTotal = new Decimal(state.totalPrice);
    //   const newTotal = currentTotal.plus(roundedTotal).toString();
    //   state.totalPrice = newTotal; // Преобразуем обратно в строку
    // },
    addProduct(state, action: PayloadAction<CartItem>) {
      state.items.push(action.payload);
      state.totalPrice += action.payload.price * action.payload.quantity;
    },
    clearProducts(state) {
      state.items = [];
    },
    increment: (state) => {
      state.quantity += 1;
    },
    decrement: (state) => {
      if (state.quantity > 1) state.quantity -= 1;
    },
    resetQuantity: (state) => {
      state.quantity = 1;
    },
    updateProduct(state, action: PayloadAction<CartItem>) {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        state.totalPrice -= item.price * item.quantity;
        item.quantity = quantity;
        state.totalPrice += item.price * item.quantity;
      }
    },
    updateCart(state, action: PayloadAction<number>) {
      const index = action.payload;
      state.items.splice(index, 1);
      state.totalPrice = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
    },
    calculateTotalQuantity(state) {
      state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
    },
  },
});

export const {
  setItemId,
  addProduct,
  clearProducts,
  increment,
  decrement,
  resetQuantity,
  updateProduct,
  updateCart,
  calculateTotalQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
