import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './slices/filterSlice';
import cartReducer from './slices/cartSlice';
import productReducer from './slices/productSlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: { filterReducer, cartReducer, productReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
