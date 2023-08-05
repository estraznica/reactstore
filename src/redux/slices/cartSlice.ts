import { createSlice } from '@reduxjs/toolkit';

interface CartState {
  itemId: string;
  totalPrice: number;
  items: any[];
  quantity: number;
  totalQuantity: number;
}
const initialState: CartState = {
  itemId: '1',
  totalPrice: 0,
  items: [],
  quantity: 1,
  totalQuantity: 1,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setItemId(state, action) {
      state.itemId = action.payload;
    },
    addProduct(state, action) {
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
    updateProduct(state, action) {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        state.totalPrice -= item.price * item.quantity;
        item.quantity = quantity;
        state.totalPrice += item.price * item.quantity;
      }
    },
    updateCart(state, action) {
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
