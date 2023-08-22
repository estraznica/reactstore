import { PayloadAction, createSlice } from '@reduxjs/toolkit';

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
  totalPrice: 0,
  items: [],
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
