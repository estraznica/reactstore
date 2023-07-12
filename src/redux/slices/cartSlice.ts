import { createSlice } from '@reduxjs/toolkit';

interface CartState {
  itemId: string;
  totalPrice: number;
  items: any[];
  quantity: number;
}
const initialState: CartState = {
  itemId: '',
  totalPrice: 0,
  items: [],
  quantity: 1,
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
    },
    removeProduct(state, action) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
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
    updateProduct: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
    },
  },
});

export const {
  setItemId,
  addProduct,
  removeProduct,
  clearProducts,
  increment,
  decrement,
  resetQuantity,
  updateProduct,
} = cartSlice.actions;

export default cartSlice.reducer;
